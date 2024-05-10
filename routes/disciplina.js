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


router.get("/disciplina", auth, async (req,res) => {
    const disciplinas = await listarDisciplinas()
    res.json({
        disciplinas,
    });
    console.log('Consulta realizada na tabela Disciplina.')
});

router.get("/disciplina/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    const disciplina = await buscarDisciplinaId(id)

    if(!disciplina){
        return res.status(404).json({error:"Disciplina não encontrada!"});
    }

    res.json({disciplina : disciplina});
    console.log('Consulta realizada na tabela disciplina, com o id: ' + id)
});

router.post("/disciplina", auth, async (req,res) => {
    try{
        const newDisciplinaJSON = JSON.stringify(req.body);
        const newDisciplina = JSON.parse(newDisciplinaJSON);
        const disciplinaSalva = await gravarDisciplina(newDisciplina)

        res.json({
            disciplina: disciplinaSalva
        })
        console.log('Gravação realizada na tabela Disciplina')
    }catch (error){
        console.error('Erro ao gravar Disciplina:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/disciplina/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
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
        console.log('Alteração realizada na tabela Disciplina, com o id: ' + id);
    }catch (error) {
        console.error("Erro ao alterar disciplina:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/disciplina/:id", auth, async (req,res) => {
    try{
        
        const id = Number(req.params.id);
        const disciplinaExiste = await buscarDisciplinaId(id);
            
        if(!disciplinaExiste){
            return res.status(404).json({error:"Disciplina não encontrada!"});
        }

        await deletarDisciplina(id);
        console.log('Deletada disciplina com o id: ' + id);
        return res.status(200).json({ message: "Disciplina deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar disciplina:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}