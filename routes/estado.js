const express = require("express");
const {gravarEstado,
listarEstados,
buscarEstadoId,
alterarEstado} = require("../database/estado");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const letrasRegex = /^[A-Za-z]+$/;

router.get("/estado", auth, async (req,res) => {
    const estados = await listarEstados()
    res.json({
        estados
    });
    const acao = ('Consulta realizada na tabela Estado.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

//Realiza consulta sem gravar log
router.get("/consulta-estado", auth, async (req,res) => {
    const estados = await listarEstados()
    res.json({
        estados
    });
});

router.get("/estado/:id", auth, async (req,res) => {
    const id = req.params.id;
    if (!letrasRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas letras.' });
    }
    const estado = await buscarEstadoId(id)

    if(!estado){
        return res.status(404).json({error:"Estado não encontrado!"});
    }

    res.json({Estado : estado});
    const acao = ('Consulta realizada na tabela Estado, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.post("/estado", auth, async (req,res) => {
    try{
        if(req.body.nm_estado === '' || req.body.cd_estado === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }
        const newEstadoJSON = JSON.stringify(req.body);
        const newEstado = JSON.parse(newEstadoJSON);
        const estadoSalvo = await gravarEstado(newEstado)

        res.json({
            estado : estadoSalvo
        })
        const acao = ('Gravação realizada na tabela Estado');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar estado:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/estado/:id", auth, async (req,res) => {
    const id = req.params.id;
    if (!letrasRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas letras.' });
    }
    const estadoExiste = await buscarEstadoId(id.toUpperCase);

    if(!estadoExiste){
        return res.status(404).json({error:"Estado não encontrado!"});
    }

    if(req.body.nm_estado === '' || req.body.cd_estado === ''){
        return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

    const estado = {
        nm_estado: req.body.nm_estado
    }

    const estadoAlterado = await alterarEstado(id, estado);
    res.json({
        estado: estadoAlterado
    })
    const acao = ('Alteração realizada na tabela Estado, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
})

module.exports = {
    router
}