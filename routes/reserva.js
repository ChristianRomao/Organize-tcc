const express = require("express");
const {
    listarReservas,
    buscarReservaId,
    gravarReserva,
    alterarReserva,
    // deletarReserva,
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

const moment = require('moment');

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

//Realiza consulta sem gravar log
router.get("/consulta-reserva", auth, async (req,res) => {
    const reservas = await listarReservas()
    res.json({
        reservas,
    });
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

/*router.post("/reserva", auth, async (req,res) => {
    try{
        if(req.body.dt_inicio === '' || req.body.dt_fim === '' ){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
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
            return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
        }

        const existeReserva = await buscarReservasPeriodoSala(sala.id_sala,dt_inicioForm,dt_fimForm);
        if(existeReserva != ""){
            return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} nas datas informadas!` });
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
            message: 'Reserva gravada com sucesso!',
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
})*/

router.post("/reserva", auth, async (req, res) => {
  try {
    if (!req.body.dt_inicio || !req.body.dt_fim) {
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

    const sala = req.body.sala;
    const salaExiste = await buscarSalaId(sala.id_sala);

    if (!salaExiste) {
      return res.status(404).json({ error: "Sala não encontrada!" });
    }

    const grade = req.body.grade;
    const gradeExiste = await buscarGradeId(grade.id_grade);

    if (!gradeExiste) {
      return res.status(404).json({ error: "Grade não encontrada!" });
    }

    const usuario = req.body.usuario;
    const usuarioExiste = await buscarUsuarioId(usuario.id_usuario);

    if (!usuarioExiste) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const status = req.body.status;
    const statusExiste = await buscarStatusId(status.cd_status);

    if (!statusExiste) {
      return res.status(404).json({ error: "Status não encontrado!" });
    }

    const dt_inicioForm = moment(req.body.dt_inicio).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const dt_fimForm = moment(req.body.dt_fim).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    const alunosVigilancia = salaExiste.qt_capacvigilancia;
    const alunosTurma = gradeExiste.qt_alunos;

    if (alunosVigilancia < alunosTurma) {
      return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
    }

    const dataInicio = moment(dt_inicioForm).startOf('day');
    const dataFim = moment(dt_fimForm).startOf('day');
    const reservas = [];

    for (let date = dataInicio; date.isSameOrBefore(dataFim); date.add(1, 'days')) {
      const currentDate = date.format('YYYY-MM-DD');
      const dt_inicioDia = `${currentDate}T${moment(req.body.dt_inicio).add(1,'seconds').format('HH:mm:ss.SSSZ')}`;
      const dt_fimDia = `${currentDate}T${moment(req.body.dt_fim).format('HH:mm:ss.SSSZ')}`;

      const existeReserva = await buscarReservasPeriodoSala(sala.id_sala, dt_inicioDia, dt_fimDia);

      if (existeReserva.length > 0) {
        const horaInicio = moment(req.body.dt_inicio).add(1, 'seconds').format('HH:mm:ss');
        return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} na data ${currentDate} às ${horaInicio}!` });
      }

      reservas.push({
        dt_inicio: dt_inicioDia,
        dt_fim: dt_fimDia,
        nm_reserva: req.body.nm_reserva,
        ds_observacao: req.body.ds_observacao,
        status_cd: status.cd_status,
        sala_id: sala.id_sala,
        grade_id: grade.id_grade,
        usuario_id: usuario.id_usuario,
      });
    }

    for (const reserva of reservas) {
      await gravarReserva(reserva);
    }

    res.json({
      reservas: reservas,
      message: 'Reservas gravadas com sucesso!',
    });

    const acao = 'Gravação realizada na tabela Reserva';
    const decode = decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog, ip, acao);

  } catch (error) {
    console.error('Erro ao gravar Reserva:' + error);
    res.status(500).json({ message: "Server Error" });
  }
});


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

        if(req.body.dt_inicio === '' || req.body.dt_fim === '' ){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
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
            return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
        }

        const existeReserva = await buscarReservasPeriodoSala(sala.id_sala,dt_inicioForm,dt_fimForm);
        if(existeReserva != ""){
            return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} nas datas informadas!` });
        }
        //END VALIDAÇÕES

        const reserva = {
            nm_reserva:     req.body.nm_reserva,
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
            reserva: reservaAlterada,
            message: 'Reserva alterada com sucesso!',
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

// router.delete("/reserva/:id", auth, async (req,res) => {
//     try{
//         const id = Number(req.params.id);
//         if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
//         if (!numeroRegex.test(id)) {
//             return res.status(400).json({ error: 'Id deve conter apenas números.' });
//         }
//         const reservaExiste = await buscarReservaId(id);
        
//         if(!reservaExiste){
//             return res.status(404).json({error:"Reserva não encontrada!"});
//         }
        
//         await deletarReserva(id);
//         const acao = ('Deletada reserva com o id: ' + id);
//         const decode = await decodeJWT(req.headers.authorization);
//         const userLog = decode.id_usuario;
//         const ip = req.ip;
//         await gravarLog(userLog,ip,acao);
//         return res.status(200).json({ message: "Reserva deletada com sucesso!" });
//     }catch (error) {
//         console.error("Erro ao deletar sala:" + error);
//         res.status(500).json({ message: "Server Error" });
//     }
// })

module.exports = {
    router
}