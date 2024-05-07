const express = require("express");
const {
    listarMaterialSalas,
    buscarMaterialSalaId,
    gravarMaterialSala,
    alterarMaterialSala,
    deletarMaterialSala
} = require("../database/materialSala");
const {buscarSalaId} = require("../database/sala");
const {buscarMaterialId} = require("../database/material");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/materialSala", async (req,res) => {
    const materialSalas = await listarMaterialSalas()
    res.json({
        materialSalas,
    });
    console.log('Consulta realizada na tabela MaterialSala.')
});

router.get("/materialSala/:id", async (req,res) => {
    const id = Number(req.params.id);
    const materialSala = await buscarMaterialSalaId(id)

    if(!materialSala){
        return res.status(404).json({error:"MaterialSala não encontrado!"});
    }

    res.json({materialSala : materialSala});
    console.log('Consulta realizada na tabela MaterialSala, com o id: ' + id)
});

/*router.post("/materialSala", async (req,res) => {
    try{
        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala)
    
        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const material = req.body.material;
        const materialExiste = await buscarMaterialId(material.id_material)
    
        if(!materialExiste){
          return res.status(404).json({ error: "Material não encontrado!" });
        }
        
        const materialSala = {
            qt_material: req.body.qt_material,
            ds_materialSala: req.body.ds_materialSala,
            sala_id: sala.id_sala,
            material_id: material.id_material
        }
        const materialSalaSalvo = await gravarMaterialSala(materialSala);

        res.json({
            materialSala: materialSalaSalvo,
        });
        console.log('Gravação realizada na tabela MaterialSala')
    }catch (error){
        console.error('Erro ao gravar MaterialSala:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})*/

router.post("/materialSala", auth, async (req, res) => {
    try {
        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala);

        if (!salaExiste) {
            return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const materiais = req.body.materiais;

        const materialSalasSalvos = await Promise.all(
            materiais.map(async (item) => {
                console.log(item)
                const materialExiste = await buscarMaterialId(item.material.id_material);

                if (!materialExiste) {
                    return res.status(404).json({error:`Material com id ${item.material.id_material} não encontrado!`});
                }

                const materialSala = {
                    qt_material: item.qt_material,
                    ds_materialSala: item.ds_materialSala, // Você pode ajustar isso conforme necessário
                    sala_id: sala.id_sala,
                    material_id: materialExiste.id_material
                };

                return gravarMaterialSala(materialSala);
            })
        );

        res.json({
            materialSalas: materialSalasSalvos,
        });
        console.log('Gravação realizada na tabela MaterialSala');
    } catch (error) {
        console.error('Erro ao gravar MaterialSala:' + error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.put("/materialSala/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        const materialSalaExiste = await buscarMaterialSalaId(id);
        
        if(!materialSalaExiste){
            return res.status(404).json({error:"MaterialSala não encontrado!"});
        }

        const sala = req.body.sala_id;
        const salaExiste = await buscarSalaId(sala)
    
        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const material = req.body.material_id;
        const materialExiste = await buscarMaterialId(material)
    
        if(!materialExiste){
          return res.status(404).json({ error: "Material não encontrado!" });
        }
        
        const materialSala = {
            qt_material: req.body.qt_material,
            ds_materialSala: req.body.ds_materialSala,
            sala_id: sala,
            material_id: material
        }
        
        const materialSalaAlterado = await alterarMaterialSala(id, materialSala);
        res.json({
            materialSala: materialSalaAlterado
        })
        console.log('Alteração realizada na tabela MaterialSala, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar MaterialSala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/materialSala/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        const materialSalaExiste = await buscarMaterialSalaId(id);
        
        if(!materialSalaExiste){
            return res.status(404).json({error:"MaterialSala não encontrado!"});
        }

        await deletarMaterialSala(id);
        console.log('Deletado MaterialSala com o id: ' + id);
        return res.status(200).json({ message: "MaterialSala deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar MaterialSala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}