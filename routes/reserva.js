const express = require("express");
const {
    listarReservas,
    buscarReservaId,
    gravarReserva,
    alterarReserva,
    deletarReserva,
    buscarReservasPeriodoSala,
} = require("../database/reserva");
const {buscarSalaId} = require("../database/sala");
const {buscarGradeId} = require("../database/grade");
const {buscarUsuarioId} = require("../database/usuario");
const {buscarStatusId} = require("../database/status");
const router = express.Router();
const {auth} = require("../middleware/auth");
const {formatarDataISO} = require("../transformarData");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/reserva", auth, async (req,res) => {
    const reservas = await listarReservas()
    res.json({
        reservas,
    });
    const acao = ('Consulta realizada na tabela Reserva.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/reserva/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const reserva = await buscarReservaId(id)

    if(!reserva){
        return res.status(404).json({error:"Reserva não encontrada!"});
    }

    res.json({reserva : reserva});
    const acao = ('Consulta realizada na tabela reserva, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.post("/reserva", auth, async (req,res) => {
    try{
        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala)

        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const grade = req.body.grade;
        const gradeExiste = await buscarGradeId(grade.id_grade)
    
        if(!gradeExiste){
          return res.status(404).json({ error: "Grade não encontrada!" });
        }

        const usuario = req.body.usuario;
        const usuarioExiste = await buscarUsuarioId(usuario.id_usuario)
        
        if(!usuarioExiste){
          return res.status(404).json({ error: "Usuario não encontrado!" });
        }
        
        const status = req.body.status
        const statusExiste = await buscarStatusId(status.cd_status)
        
        if(!statusExiste){
          return res.status(404).json({ error: "Status não encontrado!" });
        }
        
        const dt_inicioForm = formatarDataISO(req.body.dt_inicio);
        const dt_fimForm = formatarDataISO(req.body.dt_fim);
        
        //VALIDAÇÕES
        const alunosVigilancia = salaExiste.qt_capacvigilancia;
        const alunosTurma = gradeExiste.qt_alunos;

        if(alunosVigilancia < alunosTurma){
            return res.status(406).json({ message: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
        }

        const existeReserva = await buscarReservasPeriodoSala(sala.id_sala,dt_inicioForm,dt_fimForm);
        if(existeReserva != ""){
            return res.status(406).json({ message: `Já possui reserva para a sala ${salaExiste.nm_sala} nas datas informadas!` });
        }
        //END VALIDAÇÕES

        const reserva = {
            dt_inicio:      dt_inicioForm,
            dt_fim:         dt_fimForm,
            ds_observacao:  req.body.ds_observacao,
            status_cd:      status.cd_status,
            sala_id:        sala.id_sala,   
            grade_id:       grade.id_grade,
            usuario_id:     usuario.id_usuario,
        }
        const reservaSalva = await gravarReserva(reserva);

        res.json({
            reserva: reservaSalva,
        });
        const acao = ('Gravação realizada na tabela Reserva');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar Reserva:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/reserva/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const reservaExiste = await buscarReservaId(id);
        
        if(!reservaExiste){
            return res.status(404).json({error:"Reserva não encontrada!"});
        }

        const sala = req.body.sala;
        const salaExiste = await buscarSalaId(sala.id_sala)
    
        if(!salaExiste){
          return res.status(404).json({ error: "Sala não encontrada!" });
        }

        const grade = req.body.grade;
        const gradeExiste = await buscarGradeId(grade.id_grade)
    
        if(!gradeExiste){
          return res.status(404).json({ error: "Grade não encontrada!" });
        }

        const usuario = req.body.usuario;
        const usuarioExiste = await buscarUsuarioId(usuario.id_usuario)
    
        if(!usuarioExiste){
          return res.status(404).json({ error: "Usuario não encontrado!" });
        }
        
        const status = req.body.status
        const statusExiste = await buscarStatusId(status.cd_status)
        
        if(!statusExiste){
          return res.status(404).json({ error: "Status não encontrado!" });
        }

        const dt_inicioForm = formatarDataISO(req.body.dt_inicio);
        const dt_fimForm = formatarDataISO(req.body.dt_fim);

        //VALIDAÇÕES
        const alunosVigilancia = salaExiste.qt_capacvigilancia;
        const alunosTurma = gradeExiste.qt_alunos;

        if(alunosVigilancia < alunosTurma){
            return res.status(406).json({ message: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
        }

        const existeReserva = await buscarReservasPeriodoSala(sala.id_sala,dt_inicioForm,dt_fimForm);
        if(existeReserva != ""){
            return res.status(406).json({ message: `Já possui reserva para a sala ${salaExiste.nm_sala} nas datas informadas!` });
        }
        //END VALIDAÇÕES

        const reserva = {
            dt_inicio:      dt_inicioForm,
            dt_fim:         dt_fimForm,
            ds_observacao:  req.body.ds_observacao,
            status_cd:      status.status_cd,
            sala_id:        sala.id_sala,   
            grade_id:       grade.id_grade,
            usuario_id:     usuario.id_usuario,
        }
        
        const reservaAlterada = await alterarReserva(id, reserva);
        res.json({
            reserva: reservaAlterada
        })
        const acao = ('Alteração realizada na tabela reserva, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar reserva:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/reserva/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const reservaExiste = await buscarReservaId(id);
        
        if(!reservaExiste){
            return res.status(404).json({error:"Reserva não encontrada!"});
        }
        
        await deletarReserva(id);
        const acao = ('Deletada reserva com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Reserva deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar sala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}