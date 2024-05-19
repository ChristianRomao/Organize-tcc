const express = require("express");
const {
    listarUsuarios,
    buscarUsuarioId,
    buscarEmail,
    gravarUsuario,
    alterarUsuario,
    deletarUsuario
} = require("../database/usuario");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library");
const router = express.Router();
const {cpf,cnpj} = require('brazilian-doc-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/usuario", auth, async (req,res) => {
    const usuarios = await listarUsuarios()
    res.json({
        usuarios,
    });
    const acao = ('Consulta realizada na tabela Usuario.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/usuario/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const usuario = await buscarUsuarioId(id)

    if(!usuario){
        return res.status(404).json({error:"Usuario não encontrado!"});
    }

    res.json({usuario : usuario});
    const acao = ('Consulta realizada na tabela usuario, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.post("/registro", async (req,res) => {
    try{
        const emailUtilizado = await buscarEmail(req.body.ds_email);
        if(emailUtilizado){
            return res.status(400).json({message:"E-mail já utilizado!"});
        }

        const senhaCriptografada = bcrypt.hashSync(req.body.ds_senha,10);

        const dt_nascimentoForm = new Date(req.body.dt_nascimento).toISOString();

        const cpfcnpj = req.body.cd_cpfcnpj

        if(isNaN(cpfcnpj)){
            return res.status(400).json({ error: "CPF/CNPJ deve ser um número" });
        }

        // if(cpfcnpj.length == 11){
        //     const cpfValidado = cpf.validate(cpfcnpj);

        //     if(!cpfValidado){
        //         return res.status(404).json({error:"CPF inválido!"});
        //     }
        // }else if(cpfcnpj.length == 14){
        //     const cnpjValidado = cnpj.validate(cpfcnpj);

        //     if(!cnpjValidado){
        //         return res.status(404).json({error:"CNPJ inválido!"});
        //     }
        // }else{
        //     return res.status(404).json({error:"CPF/CNPJ inválido!"});
        // }

        if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(req.body.nm_usuario)) {
            return res.status(400).json({ message: "Nome não pode conter números/caracteres especiais!" });
        }

        const usuario = {
            cd_cpfcnpj: cpfcnpj,
            nm_usuario: req.body.nm_usuario,
            dt_nascimento: dt_nascimentoForm,
            ds_email: req.body.ds_email,
            ds_senha: senhaCriptografada,
            ds_funcao: req.body.ds_funcao
        }
        const usuarioSalvo = await gravarUsuario(usuario);

        res.status(201).json({
            usuario: usuarioSalvo,
        });
        const acao = ('Gravação realizada na tabela Usuario');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar curso:", error);
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.message;
            const constraintNameMatch = errorMessage.match(/`([^`]+)`$/);
            const constraintName = constraintNameMatch ? constraintNameMatch[1] : "Unknown Constraint";
            res.status(500).json({ message: "Server Error", constraintName });
        } else {
            res.status(500).json({ message: "Server Error", error });
        }
    }
})

router.post("/login", async (req,res) => {
    try{
        const email = req.body.ds_email;
        const senha = req.body.ds_senha;

        const usuario = await buscarEmail(email);
        if(!usuario) return res.status(401).send("E-mail inválido!");

        const validaSenha = bcrypt.compareSync(senha, usuario.ds_senha);
        if(!validaSenha) return res.status(401).send("Senha incorreta!");

        const token = jwt.sign({
            id_usuario: usuario.id_usuario,
            nm_usuario: usuario.nm_usuario,
        }, process.env.SECRET)

        res.json({
            sucess: true,
            token,
        });

        const acao = ('Login realizado com o e-mail: '+email);
        const userLog = usuario.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao deletar usuario:" + error);
        res.status(500).json({ message: "Server Error" });
    }

})

router.put("/usuario/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const usuarioExiste = await buscarUsuarioId(id);
        
        if(!usuarioExiste){
            return res.status(404).json({error:"Usuario não encontrado!"});
        }

        const senhaCriptografada = bcrypt.hashSync(req.body.ds_senha,10);

        const cpfcnpj = req.body.cd_cpfcnpj

        if(isNaN(cpfcnpj)){
            return res.status(400).json({ error: "CPF/CNPJ deve ser um número" });
        }

        // if(cpfcnpj.length == 11){
        //     const cpfValidado = cpf.validate(cpfcnpj);

        //     if(!cpfValidado){
        //         return res.status(404).json({error:"CPF inválido!"});
        //     }
        // }else if(cpfcnpj.length == 14){
        //     const cnpjValidado = cnpj.validate(cpfcnpj);

        //     if(!cnpjValidado){
        //         return res.status(404).json({error:"CNPJ inválido!"});
        //     }
        // }else{
        //     return res.status(404).json({error:"CPF/CNPJ inválido!"});
        // }

        
        const dt_nascimentoForm = new Date(req.body.dt_nascimento).toISOString();

        if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(req.body.nm_usuario)) {
            return res.status(400).json({ message: "Nome não pode conter números/caracteres especiais!" });
        }

        const usuario = {
            cd_cpfcnpj: cpfcnpj,
            nm_usuario: req.body.nm_usuario,
            dt_nascimento: dt_nascimentoForm,
            ds_email: req.body.ds_email,
            ds_senha: senhaCriptografada,
            ds_funcao: req.body.ds_funcao
        }
        
        const usuarioAlterado = await alterarUsuario(id, usuario);
        res.json({
            usuario: usuarioAlterado
        })
        const acao = ('Alteração realizada na tabela Usuario, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar usuário:", error);
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.message;
            const constraintNameMatch = errorMessage.match(/`([^`]+)`$/);
            const constraintName = constraintNameMatch ? constraintNameMatch[1] : "Unknown Constraint";
            res.status(500).json({ message: "Server Error", constraintName });
        } else {
            res.status(500).json({ message: "Server Error", error });
        }
    }
    })

router.delete("/usuario/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const usuarioExiste = await buscarUsuarioId(id);
        
        if(!usuarioExiste){
            return res.status(404).json({error:"Usuario não encontrado!"});
        }

        await deletarUsuario(id);
        const acao = ('Deletado usuario com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Usuario deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar usuario:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
};