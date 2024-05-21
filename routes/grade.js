const express = require("express");
const {
    listarGrades,
    buscarGradeId,
    gravarGrade,
    alterarGrade,
    deletarGrade
} = require("../database/grade");
const {buscarDisciplinaId} = require("../database/disciplina");
const {buscarTurmaId} = require("../database/turma");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/grade", auth, async (req,res) => {
    const grades = await listarGrades()
    res.json({
        grades,
    });
    const acao = ('Consulta realizada na tabela Grade.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

//Realiza consulta sem gravar log
router.get("/consulta-grade", auth, async (req,res) => {
    const grades = await listarGrades()
    res.json({
        grades,
    });
});

router.get("/grade/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const grade = await buscarGradeId(id)

    if(!grade){
        return res.status(404).json({error:"Grade não encontrada!"});
    }

    res.json({grade : grade});
    const acao = ('Consulta realizada na tabela grade, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.post("/grade", auth, async (req,res) => {
    try{
        if(req.body.nm_professor === '' || req.body.nr_cargahr === '' ||req.body.qt_alunos === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const disciplina = req.body.disciplina;
        const disciplinaExiste = await buscarDisciplinaId(disciplina.id_disciplina)
    
        if(!disciplinaExiste){
          return res.status(404).json({ error: "Disciplina não encontrada!" });
        }
        
        const turma = req.body.turma;
        const turmaExiste = await buscarTurmaId(turma.id_turma)
    
        if(!turmaExiste){
          return res.status(404).json({ error: "Turma não encontrada!" });
        }

        if(req.body.qt_alunos <= 0){
            return res.status(400).json({ error: "Quantidade inválida!" });
        }

        const grade = {
            nm_professor: req.body.nm_professor,
            nr_cargahr: req.body.nr_cargahr,
            qt_alunos: req.body.qt_alunos,
            disciplina_id: disciplina.id_disciplina,
            turma_id: turma.id_turma,
        }
        const gradeSalva = await gravarGrade(grade);

        res.json({
            grade: gradeSalva,
            message: 'Grade gravada com sucesso!',
        });
        const acao = ('Gravação realizada na tabela Grade');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar Grade:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/grade/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
          return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const gradeExiste = await buscarGradeId(id);
        
        if(!gradeExiste){
            return res.status(404).json({error:"Grade não encontrada!"});
        }

        if(req.body.nm_professor === '' || req.body.nr_cargahr === '' ||req.body.qt_alunos === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const disciplina = req.body.disciplina_id;
        const disciplinaExiste = await buscarDisciplinaId(disciplina)
    
        if(!disciplinaExiste){
          return res.status(404).json({ error: "Disciplina não encontrada!" });
        }
        
        const turma = req.body.turma_id;
        const turmaExiste = await buscarTurmaId(turma)
    
        if(!turmaExiste){
          return res.status(404).json({ error: "Turma não encontrada!" });
        }

        if(req.body.qt_alunos <= 0){
            return res.status(400).json({ error: "Quantidade inválida!" });
        }

        const grade = {
            nm_professor: req.body.nm_professor,
            nr_cargahr: req.body.nr_cargahr,
            qt_alunos: req.body.qt_alunos,
            disciplina_id: disciplina,
            turma_id: turma,
        }
        
        const gradeAlterada = await alterarGrade(id, grade);
        res.json({
            polo: gradeAlterada,
            message: 'Grade alterada com sucesso!',
        })
        const acao = ('Alteração realizada na tabela grade, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar grade:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/grade/:id", auth, async (req,res) => {
    try{
        
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
          return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const gradeExiste = await buscarGradeId(id);
        
        if(!gradeExiste){
            return res.status(404).json({error:"Grade não encontrada!"});
        }

        await deletarGrade(id);
        const acao = ('Deletada grade com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao)
        return res.status(200).json({ message: "Grade deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar grade:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}