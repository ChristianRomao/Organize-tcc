const express = require("express");
const {
    listarCursos,
    buscarCursoId,
    gravarCurso,
    alterarCurso,
    deletarCurso
} = require("../database/curso");
const router = express.Router();
const {auth} = require("../middleware/auth");


router.get("/curso", async (req,res) => {
    const cursos = await listarCursos()
    res.json({
        cursos,
    });
    console.log('Consulta realizada na tabela Curso.')
});

router.get("/curso/:id", async (req,res) => {
    const id = Number(req.params.id);
    const curso = await buscarCursoId(id)

    if(!curso){
        return res.status(404).json({error:"Curso não encontrado!"});
    }

    res.json({curso : curso});
    console.log('Consulta realizada na tabela curso, com o id: ' + id)
});

router.post("/curso", auth, async (req,res) => {
    try{
        const newCursoJSON = JSON.stringify(req.body);
        const newCurso = JSON.parse(newCursoJSON);
        const cursoSalvo = await gravarCurso(newCurso)

        res.json({
            curso: cursoSalvo
        })
        console.log('Gravação realizada na tabela Curso')
    }catch (error){
        console.error('Erro ao gravar Curso:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/curso/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        const cursoExiste = await buscarCursoId(id);
        
        if(!cursoExiste){
            return res.status(404).json({error:"Curso não encontrado!"});
        }
        
        const curso = {
            ds_curso: req.body.ds_curso
        }
        
        const cursoAlterado = await alterarCurso(id, curso);
        res.json({
            curso: cursoAlterado
        })
        console.log('Alteração realizada na tabela Curso, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar curso:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/curso/:id", auth, async (req,res) => {
    try{
        
        const id = Number(req.params.id);
        const cursoExiste = await buscarCursoId(id);
        
        if(!cursoExiste){
            return res.status(404).json({error:"Curso não encontrado!"});
        }

        await deletarCurso(id);
        console.log('Deletado curso com o id: ' + id);
        return res.status(200).json({ message: "Curso deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar curso:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}