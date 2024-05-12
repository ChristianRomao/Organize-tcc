const express = require("express");
const {
    listarDisciplinas,
    buscarDisciplinaId,
    gravarDisciplina,
    alterarDisciplina,
    deletarDisciplina
} = require("../database/disciplina");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/disciplina", auth, async (req,res) => {
    const disciplinas = await listarDisciplinas()
    res.json({
        disciplinas,
    });
    const acao = ('Consulta realizada na tabela Disciplina.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
});

router.get("/disciplina/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const disciplina = await buscarDisciplinaId(id)

    if(!disciplina){
        return res.status(404).json({error:"Disciplina não encontrada!"});
    }

    res.json({disciplina : disciplina});
    const acao = ('Consulta realizada na tabela disciplina, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
});

router.post("/disciplina", auth, async (req,res) => {
    try{
        const newDisciplinaJSON = JSON.stringify(req.body);
        const newDisciplina = JSON.parse(newDisciplinaJSON);
        const disciplinaSalva = await gravarDisciplina(newDisciplina)

        res.json({
            disciplina: disciplinaSalva
        })
        const acao = ('Gravação realizada na tabela Disciplina');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
    }catch (error){
        console.error('Erro ao gravar Disciplina:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/disciplina/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const disciplinaExiste = await buscarDisciplinaId(id);
        
        if(!disciplinaExiste){
            return res.status(404).json({error:"Disciplina não encontrada!"});
        }
        
        const disciplina = {
            nm_disciplina: req.body.nm_disciplina
        }
        
        const disciplinaAlterada = await alterarDisciplina(id, disciplina);
        res.json({
            disciplina: disciplinaAlterada
        })
        const acao = ('Alteração realizada na tabela Disciplina, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
    }catch (error) {
        console.error("Erro ao alterar disciplina:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/disciplina/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const disciplinaExiste = await buscarDisciplinaId(id);
            
        if(!disciplinaExiste){
            return res.status(404).json({error:"Disciplina não encontrada!"});
        }

        await deletarDisciplina(id);
        const acao = ('Deletada disciplina com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
        return res.status(200).json({ message: "Disciplina deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar disciplina:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}