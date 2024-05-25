const express = require("express");
const {buscarCursoId} = require("../database/curso");
const {
    listarTurmas,
    buscarTurmaId,
    buscarTurmaAno,
    buscarTurmaCurso,
    gravarTurma,
    alterarTurma,
    deletarTurma
} = require("../database/turma");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/turma", auth, async (req,res) => {
    const turmas = await listarTurmas()
    res.json({
        turmas,
    });
    const acao = ('Consulta realizada na tabela Turma.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

//Realiza consulta sem gravar log
router.get("/consulta-turma", auth, async (req,res) => {
    const turmas = await listarTurmas()
    res.json({
        turmas,
    });
});

router.get("/consulta-turma-anoletivo", auth, async (req,res) => {
    const turmas = await listarTurmas()
    res.json({
        turmas,
    });
});

router.get("/consulta-turma-curso", auth, async (req,res) => {
    const turmas = await listarTurmas()
    res.json({
        turmas,
    });
});

router.get("/turma/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const turma = await buscarTurmaId(id)

    if(!turma){
        return res.status(404).json({error:"Turma não encontrada!"});
    }

    res.json({turma : turma});
    const acao = ('Consulta realizada na tabela turma, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/consulta-turma-anoletivo/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Ano para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Ano deve conter apenas números.' });
    }
    const turmas = await buscarTurmaAno(id);

    if(!turmas){
        return res.status(404).json({error:"Turmas não encontradas!"});
    }

    res.json({turmas});
});

router.get("/consulta-turma-curso/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const turmas = await buscarTurmaCurso(id);

    if(!turmas){
        return res.status(404).json({error:"Turmas não encontradas!"});
    }

    res.json({turmas});
});

router.post("/turma", auth, async (req,res) => {
    try{
        if(req.body.ds_turma === '' || req.body.nr_anoletivo === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const curso = req.body.curso;
        const cursoExiste = await buscarCursoId(curso.id_curso)
    
        if(!cursoExiste){
          return res.status(404).json({ error: "Curso não encontrado!" });
        }

        const turma = {
            ds_turma: req.body.ds_turma,
            nr_anoletivo: req.body.nr_anoletivo,
            curso_id: curso.id_curso,
        }
        const turmaSalva = await gravarTurma(turma);

        res.json({
            turma: turmaSalva,
            message: 'Turma gravada com sucesso!',
        });
        const acao = ('Gravação realizada na tabela Turma');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar Turma:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/turma/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        const turmaExiste = await buscarTurmaId(id);
        
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });

        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }

        if(!turmaExiste){
            return res.status(404).json({error:"Turma não encontrada!"});
        }
        
        if(req.body.ds_turma === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }
        
        const curso = req.body.curso_id;
        const cursoExiste = await buscarCursoId(curso)
    
        if(!cursoExiste){
          return res.status(404).json({ error: "Curso não encontrado!" });
        }
        
        const turma = {
            ds_turma: req.body.ds_turma,
            nr_anoletivo:req.body.nr_anoletivo,
            curso_id: curso,
        }
        
        const turmaAlterado = await alterarTurma(id, turma);
        res.json({
            turma: turmaAlterado,
            message: 'Turma alterada com sucesso!',
        })
        const acao = ('Alteração realizada na tabela turma, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar turma:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/turma/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const turmaExiste = await buscarTurmaId(id);
        
        if(!turmaExiste){
            return res.status(404).json({error:"Turma não encontrada!"});
        }

        await deletarTurma(id);
        const acao = ('Deletada turma com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Turma deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar turma:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}