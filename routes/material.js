const express = require("express");
const {
    listarMateriais,
    buscarMaterialId,
    gravarMaterial,
    alterarMaterial,
    deletarMaterial
} = require("../database/material");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/material", async (req,res) => {
    const materiais = await listarMateriais()
    res.json({
        materiais,
    });
    console.log('Consulta realizada na tabela Material.')
});

router.get("/material/:id", async (req,res) => {
    const id = Number(req.params.id);
    const material = await buscarMaterialId(id)

    if(!material){
        return res.status(404).json({error:"Material não encontrado!"});
    }

    res.json({material : material});
    console.log('Consulta realizada na tabela Material, com o id: ' + id)
});

router.post("/material", auth, async (req,res) => {
    try{
        const newMaterialJSON = JSON.stringify(req.body);
        const newMaterial = JSON.parse(newMaterialJSON);
        const materialSalvo = await gravarMaterial(newMaterial)

        res.json({
            material: materialSalvo
        })
        console.log('Gravação realizada na tabela Material')
    }catch (error){
        console.error('Erro ao gravar material:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/material/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        const materialExiste = await buscarMaterialId(id);
        
        if(!materialExiste){
            return res.status(404).json({error:"Material não encontrado!"});
        }
        
        const material = {
            ds_material: req.body.ds_material
        }
        
        const materialAlterado = await alterarMaterial(id, material);
        res.json({
            material: materialAlterado
        })
        console.log('Alteração realizada na tabela Material, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar material:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/material/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        const materialExiste = await buscarMaterialId(id);
        
        if(!materialExiste){
            return res.status(404).json({error:"Material não encontrado!"});
        }
        
        await deletarMaterial(id);
        console.log('Deletado material com o id: ' + id);
        return res.status(200).json({ message: "Material deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar material:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}