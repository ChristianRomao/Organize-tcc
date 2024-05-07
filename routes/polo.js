const express = require("express");
const {
    listarPolos,
    buscarPoloId,
    gravarPolo,
    alterarPolo,
    deletarPolo
} = require("../database/polo");
const {buscarMunicipioId} = require("../database/municipio");
const {buscarInstituicaoId} = require("../database/instituicao");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/polo", async (req,res) => {
    const polos = await listarPolos()
    res.json({
        polos,
    });
    console.log('Consulta realizada na tabela Polo.')
});

router.get("/polo/:id", async (req,res) => {
    const id = Number(req.params.id);
    const polo = await buscarPoloId(id)

    if(!polo){
        return res.status(404).json({error:"Polo não encontrado!"});
    }

    res.json({polo : polo});
    console.log('Consulta realizada na tabela polo, com o id: ' + id)
});

router.post("/polo", auth, async (req,res) => {
    try{
        const instituicao = req.body.instituicao;
        const instituicaoExiste = await buscarInstituicaoId(instituicao.id_instituicao)
    
        if(!instituicaoExiste){
          return res.status(404).json({ error: "Instituição não encontrada!" });
        }
        
        const municipio = req.body.municipio;
        const municipioExiste = await buscarMunicipioId(municipio.id_municipio)
    
        if(!municipioExiste){
          return res.status(404).json({ error: "Municipio não encontrado!" });
        }

        const polo = {
            nm_polo: req.body.nm_polo,
            ds_endereco: req.body.ds_endereco,
            municipio_id: municipio.id_municipio,
            instituicao_id: instituicao.id_instituicao,
        }
        const poloSalvo = await gravarPolo(polo);

        res.json({
            polo: poloSalvo,
        });
        console.log('Gravação realizada na tabela Polo')
    }catch (error){
        console.error('Erro ao gravar Polo:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/polo/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        const poloExiste = await buscarPoloId(id);
        
        if(!poloExiste){
            return res.status(404).json({error:"Polo não encontrado!"});
        }

        const instituicao = req.body.instituicao_id;
        const instituicaoExiste = await buscarInstituicaoId(instituicao)
    
        if(!instituicaoExiste){
          return res.status(404).json({ error: "Instituição não encontrada!" });
        }
        
        const municipio = req.body.municipio_id;
        const municipioExiste = await buscarMunicipioId(municipio)
    
        if(!municipioExiste){
          return res.status(404).json({ error: "Municipio não encontrado!" });
        }

        const polo = {
            nm_polo: req.body.nm_polo,
            ds_endereco: req.body.ds_endereco,
            municipio_id: municipio,
            instituicao_id: instituicao,
        }
        
        const poloAlterado = await alterarPolo(id, polo);
        res.json({
            polo: poloAlterado
        })
        console.log('Alteração realizada na tabela polo, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar polo:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/polo/:id", auth, async (req,res) => {
    try{
        
        const id = Number(req.params.id);
        const poloExiste = await buscarPoloId(id);
        
        if(!poloExiste){
            return res.status(404).json({error:"Polo não encontrado!"});
        }

        await deletarPolo(id);
        console.log('Deletado polo com o id: ' + id);
        return res.status(200).json({ message: "Polo deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar polo:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}