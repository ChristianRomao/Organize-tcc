const express = require("express");
const {gravarEstado,
listarEstados,
buscarEstadoId,
alterarEstado} = require("../database/estado");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/estado", async (req,res) => {
    const estados = await listarEstados()
    res.json({
        estados
    });
    console.log('Consulta realizada na tabela Estado.')
});

router.get("/estado/:id", async (req,res) => {
    const id = req.params.id;
    const estado = await buscarEstadoId(id)

    if(!estado){
        return res.status(404).json({error:"Estado não encontrado!"});
    }

    res.json({Estado : estado});
    console.log('Consulta realizada na tabela Estado, com o id: ' + id)
});

router.post("/estado", auth, async (req,res) => {
    try{
        const newEstadoJSON = JSON.stringify(req.body);
        const newEstado = JSON.parse(newEstadoJSON);
        const estadoSalvo = await gravarEstado(newEstado)

        res.json({
            estado : estadoSalvo
        })
        console.log('Gravação realizada na tabela Estado')
    }catch (error){
        console.error('Erro ao gravar estado:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/estado/:id", auth, async (req,res) => {
    const id = req.params.id;
    const estadoExiste = await buscarEstadoId(id);

    if(!estadoExiste){
        return res.status(404).json({error:"Estado não encontrado!"});
    }

    const estado = {
        nm_estado: req.body.nm_estado
    }

    const estadoAlterado = await alterarEstado(id, estado);
    res.json({
        estado: estadoAlterado
    })
    console.log('Alteração realizada na tabela Estado, com o id: ' + id);
})

module.exports = {
    router
}