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
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/curso",  auth, async (req,res) => {
    const cursos = await listarCursos()
    res.json({
        cursos,
    });
    const acao = ('Consulta realizada na tabela Curso.')
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
});

router.get("/curso/:id",  auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const curso = await buscarCursoId(id)

    if(!curso){
        return res.status(404).json({error:"Curso não encontrado!"});
    }

    res.json({curso : curso});
    const acao = ('Consulta realizada na tabela curso, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
});

router.post("/curso", auth, async (req,res) => {
    try{
        if(req.body.ds_curso === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }
      
        const newCursoJSON = JSON.stringify(req.body);
        const newCurso = JSON.parse(newCursoJSON);
        const cursoSalvo = await gravarCurso(newCurso)

        res.json({
            curso: cursoSalvo
        })
        const acao = ('Gravação realizada na tabela Curso');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
    }catch (error){
        console.error('Erro ao gravar Curso:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/curso/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        
        const cursoExiste = await buscarCursoId(id);
        
        if(!cursoExiste){
            return res.status(404).json({error:"Curso não encontrado!"});
        }
        
        if(req.body.ds_curso === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const curso = {
            ds_curso: req.body.ds_curso
        }
        
        const cursoAlterado = await alterarCurso(id, curso);
        res.json({
            curso: cursoAlterado
        })
        const acao = ('Alteração realizada na tabela Curso, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
    }catch (error) {
        console.error("Erro ao alterar curso:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/curso/:id", auth, async (req,res) => {
    try{   
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const cursoExiste = await buscarCursoId(id);
        
        if(!cursoExiste){
            return res.status(404).json({error:"Curso não encontrado!"});
        }

        await deletarCurso(id);
        const acao = ('Deletado curso com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
        return res.status(200).json({ message: "Curso deletado com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar curso:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}