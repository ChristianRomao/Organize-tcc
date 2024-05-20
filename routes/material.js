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
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/material", auth, async (req,res) => {
    const materiais = await listarMateriais()
    res.json({
        materiais,
    });
    const acao = ('Consulta realizada na tabela Material.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

//Realiza consulta sem gravar log
router.get("/consulta-material", auth, async (req,res) => {
    const materiais = await listarMateriais()
    res.json({
        materiais,
    });
});

router.get("/material/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const material = await buscarMaterialId(id)

    if(!material){
        return res.status(404).json({error:"Material não encontrado!"});
    }

    res.json({material : material});
    const acao = ('Consulta realizada na tabela Material, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.post("/material", auth, async (req,res) => {
    try{
        if(req.body.ds_material === '' || req.body.qt_material === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const newMaterialJSON = JSON.stringify(req.body);
        const newMaterial = JSON.parse(newMaterialJSON);
        const materialSalvo = await gravarMaterial(newMaterial)

        res.json({
            material: materialSalvo
        })
        const acao = ('Gravação realizada na tabela Material');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar material:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/material/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const materialExiste = await buscarMaterialId(id);
        
        if(!materialExiste){
            return res.status(404).json({error:"Material não encontrado!"});
        }

        if(req.body.ds_material === '' || req.body.qt_material === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const movtoMaterial = materialExiste.qt_material + req.body.qt_material;

        const material = {
            ds_material: req.body.ds_material,
            qt_material: movtoMaterial
        }
        
        const materialAlterado = await alterarMaterial(id, material);
        res.json({
            material: materialAlterado
        })
        const acao = ('Alteração realizada na tabela Material, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar material:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/material/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const materialExiste = await buscarMaterialId(id);
        
        if(!materialExiste){
            return res.status(404).json({error:"Material não encontrado!"});
        }
        
        await deletarMaterial(id);
        const acao = ('Deletado material com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Material deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar material:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}