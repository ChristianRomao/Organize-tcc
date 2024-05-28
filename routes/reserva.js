const express = require("express");
const {
    listarReservas,
    buscarReservaId,
    buscarReservasPeriodoSala,
    buscarReservaNome,
    buscarReservaGrupo,
    gravarReserva,
    alterarReserva,
    deletarReserva,
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
const { v4: uuidv4 } = require('uuid');


const moment = require('moment-timezone');

const TIMEZONE = 'America/Sao_Paulo';

const numeroRegex = /^[0-9]+$/;
const letrasRegex = /^[A-Za-z]+$/;


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

router.get("/reserva/nome/:nome", auth, async (req,res) => {
  const nome = req.params.nome;

  if(nome === '') return res.status(404).json({ error: "Deverá ser fornecido o nome para consulta!" });

  const reservas = await buscarReservaNome(nome)

  if(!reservas || reservas === 0){
      return res.status(404).json({error:"Reservas não encontradas!"});
  }

  res.json({reservas});
  const acao = ('Consulta realizada na tabela reserva, com o nome: ' + nome);
  const decode = decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.get("/reservas/grupo/:idGrupo", auth, async (req,res) => {
  const idGrupo = req.params.idGrupo;

  if(idGrupo === '') return res.status(404).json({ error: "Deverá ser fornecido o id do grupo para consulta!" });

  const reservas = await buscarReservaGrupo(idGrupo)

  if(!reservas || reservas === 0){
      return res.status(404).json({error:"Reservas não encontradas!"});
  }

  res.json({reservas});
  const acao = ('Consulta realizada na tabela reserva, com o id grupo: ' + idGrupo);
  const decode = decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.get("/reservas/grupos", auth, async (req, res) => {
  //http://localhost:8080/reservas/grupos?nm_reserva=nomereserva
  try {
    const { nm_reserva } = req.query;

    if (!nm_reserva) {
      return res.status(400).json({ error: "O nome da reserva é obrigatório!" });
    }

    const reservas = await buscarReservaNome(nm_reserva);

    const grupos = {};
    reservas.forEach(reserva => {
      const grupoId = reserva.id_grupo || reserva.id_reserva; // Se não houver id_grupo, usa o ID da reserva como identificador único
      if (!grupos[grupoId]) {
        grupos[grupoId] = {
          grupo_id: grupoId,
          nm_reserva: reserva.nm_reserva,
          ds_observacao: reserva.ds_observacao,
          status: reserva.status,
          sala: reserva.sala,
          grade: reserva.grade,
          usuario: reserva.usuario,
          reservas: [],
          dt_inicio_periodo: reserva.dt_inicio,
          dt_fim_periodo: reserva.dt_fim,
        };
      } else {
        grupos[grupoId].reservas.push(reserva);
        grupos[grupoId].dt_inicio_periodo = moment.min(moment(grupos[grupoId].dt_inicio_periodo), moment(reserva.dt_inicio)).toISOString();
        grupos[grupoId].dt_fim_periodo = moment.max(moment(grupos[grupoId].dt_fim_periodo), moment(reserva.dt_fim)).toISOString();
      }
    });

    const groups = Object.values(grupos).map(grupo => ({
      grupo_id: grupo.grupo_id,
      nm_reserva: grupo.nm_reserva,
      ds_observacao: grupo.ds_observacao,
      status: grupo.status,
      sala: grupo.sala,
      grade: grupo.grade,
      usuario: grupo.usuario,
      dt_inicio_periodo: grupo.dt_inicio_periodo,
      dt_fim_periodo: grupo.dt_fim_periodo,
    }));

    res.json({
      grupos: groups,
      message: 'Reservas agrupadas por id_grupo com período calculado obtidas com sucesso!',
    });
  } catch (error) {
    console.error("Erro ao buscar reservas agrupadas por id_grupo com período calculado:", error);
    res.status(500).json({ message: "Server Error" });
  }
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
      return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida na sala! (${alunosVigilancia})` });
    }

    const dataInicio = moment(dt_inicioForm).startOf('day');
    const dataFim = moment(dt_fimForm).startOf('day');
    const reservas = [];
    const id_grupo = uuidv4();

    for (let date = dataInicio; date.isSameOrBefore(dataFim); date.add(1, 'days')) {

      const currentDate = date.format('YYYY-MM-DD');

      const inicioMoment = moment(req.body.dt_inicio).add(1, 'seconds');

      const dt_inicioDia = new Date(inicioMoment).toLocaleString('pt-BR');
      const dt_fimDia = new Date(req.body.dt_fim).toLocaleString('pt-BR');
  
      const [inicioDia, inicioHora] = dt_inicioDia.split(', ');
      const [fimDia, fimHora] = dt_fimDia.split(', ');

      const dt_inicioDate = `${moment(inicioDia, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${inicioHora}.000Z`;
      const dt_fimDate = `${moment(fimDia, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${fimHora}.000Z`;

      const existeReserva = await buscarReservasPeriodoSala(sala.id_sala, dt_inicioDate, dt_fimDate);

      if (existeReserva.length > 0) {
        const horaInicio = moment(req.body.dt_inicio).add(1, 'seconds').format('HH:mm:ss');
        return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} na data ${currentDate} às ${horaInicio}!` });
      }

      reservas.push({
        dt_inicio: dt_inicioDate,
        dt_fim: dt_fimDate,
        nm_reserva: req.body.nm_reserva,
        ds_observacao: req.body.ds_observacao,
        id_grupo: id_grupo,
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
      message: 'Reserva(s) gravada(s) com sucesso!',
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

//Não vai utilizar esse PUT
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
            return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida na sala! (${alunosVigilancia})` });
        }

        //const existeReserva = await buscarReservasPeriodoSala(sala.id_sala,dt_inicioForm,dt_fimForm);
        // if(existeReserva != ""){
        //     return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} nas datas informadas!` });
        // }
        // //END VALIDAÇÕES

        // const reserva = {
        //     nm_reserva:     req.body.nm_reserva,
        //     dt_inicio:      dt_inicioForm,
        //     dt_fim:         dt_fimForm,
        //     ds_observacao:  req.body.ds_observacao,
        //     status_cd:      status.status_cd,
        //     sala_id:        sala.id_sala,   
        //     grade_id:       grade.id_grade,
        //     usuario_id:     usuario.id_usuario,
        // }
        
        // const reservaAlterada = await alterarReserva(id, reserva);
        // res.json({
        //     reserva: reservaAlterada,
        //     message: 'Reserva alterada com sucesso!',
        // })
        for (let date = dataInicio; date.isSameOrBefore(dataFim); date.add(1, 'days')) {
          const currentDate = date.format('YYYY-MM-DD');
          let dt_inicioDia = `${currentDate}T${moment.tz(req.body.dt_inicio, TIMEZONE).add(1, 'seconds').format('HH:mm:ss.SSSZ')}`;
          let dt_fimDia = `${currentDate}T${moment.tz(req.body.dt_fim, TIMEZONE).format('HH:mm:ss.SSSZ')}`;

          dt_inicioDia = new Date(it.dt_inicioDia).toLocaleString('PT-BR');
          dt_fimDia = new Date(it.dt_fimDia).toLocaleString('PT-BR');
          
          const existeReserva = await buscarReservasPeriodoSala(sala.id_sala, dt_inicioDia, dt_fimDia);
    
          if (existeReserva.length > 0) {
            const horaInicio = moment(req.body.dt_inicio).add(1, 'seconds').format('HH:mm:ss');
            return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} na data ${currentDate} às ${horaInicio}!` });
          }
        }
    
        const reserva = {
          nm_reserva: req.body.nm_reserva,
          dt_inicio: dt_inicioForm,
          dt_fim: dt_fimForm,
          ds_observacao: req.body.ds_observacao,
          status_cd: status.cd_status,
          sala_id: sala.id_sala,
          grade_id: grade.id_grade,
          usuario_id: usuario.id_usuario,
        };
    
        const reservaAlterada = await alterarReserva(id, reserva);
        res.json({
          reserva: reservaAlterada,
          message: 'Reserva(s) alterada(s) com sucesso!',
        });
        
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

//Não vai utilizar esse PUT
router.put("/reservas/nome/:nome", auth, async (req, res) => {
  try {
    const nome = req.params.nome;

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

    // Validar capacidade
    const alunosVigilancia = salaExiste.qt_capacvigilancia;
    const alunosTurma = gradeExiste.qt_alunos;
    if (alunosVigilancia < alunosTurma) {
      return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
    }

    const reservas = await buscarReservaNome(nome);

    if (reservas.length === 0) {
      return res.status(404).json({ error: "Nenhuma reserva encontrada com o nome fornecido!" });
    }

    for (const reserva of reservas) {
      const dataInicio = moment(dt_inicioForm).startOf('day');
      const dataFim = moment(dt_fimForm).startOf('day');

      for (let date = dataInicio; date.isSameOrBefore(dataFim); date.add(1, 'days')) {
        const currentDate = date.format('YYYY-MM-DD');
        const dt_inicioDia = `${currentDate}T${moment(req.body.dt_inicio).add(1, 'seconds').format('HH:mm:ss.SSSZ')}`;
        const dt_fimDia = `${currentDate}T${moment(req.body.dt_fim).format('HH:mm:ss.SSSZ')}`;

        const existeReserva = await buscarReservasPeriodoSala(sala.id_sala, dt_inicioDia, dt_fimDia);

        if (existeReserva.length > 0) {
          const horaInicio = moment(req.body.dt_inicio).add(1, 'seconds').format('HH:mm:ss');
          return res.status(406).json({ alert: `Já possui reserva para a sala ${salaExiste.nm_sala} na data ${currentDate} às ${horaInicio}!` });
        }
      }

      const novaReserva = {
        nm_reserva: req.body.nm_reserva || reserva.nm_reserva,
        dt_inicio: dt_inicioForm,
        dt_fim: dt_fimForm,
        ds_observacao: req.body.ds_observacao || reserva.ds_observacao,
        status_cd: status.cd_status,
        sala_id: sala.id_sala,
        grade_id: grade.id_grade,
        usuario_id: usuario.id_usuario,
      };

      await alterarReserva(reserva.id_reserva, novaReserva);
    }

    res.json({
      message: 'Reservas alteradas com sucesso!',
    });

    const acao = 'Alteração realizada nas reservas com o nome: ' + nome;
    const decode = decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog, ip, acao);

  } catch (error) {
    console.error("Erro ao alterar reservas:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/reservas/grupo/:idGrupo", auth, async (req, res) => {
  try {
    const idGrupo = req.params.idGrupo;

    if (!idGrupo || idGrupo === '') {
      return res.status(400).json({ error: "ID do grupo inválido!" });
    }

    const sala = req.body.sala;
    let salaExiste = ''
    if(sala){
      salaExiste = await buscarSalaId(sala.id_sala);
      console.log('salaaaaaaa'+sala)
    }
    if (!salaExiste && sala) {
      return res.status(404).json({ error: "Sala não encontrada!" });
    }

    const grade = req.body.grade;
    let gradeExiste = ''
    if(grade){
      gradeExiste = await buscarGradeId(grade.id_grade);
    }
    if (!gradeExiste && grade) {
      return res.status(404).json({ error: "Grade não encontrada!" });
    }

    const usuario = req.body.usuario;
    let usuarioExiste = ''
    if(usuario){
      usuarioExiste = await buscarUsuarioId(usuario.id_usuario);
    }
    if (!usuarioExiste && usuario) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    }

    const status = req.body.status;
    let statusExiste = ''
    if(status){
      statusExiste = await buscarStatusId(status.cd_status);
    }
    if (!statusExiste && status) {
      return res.status(404).json({ error: "Status não encontrado!" });
    }

    const dt_inicioForm = moment(req.body.dt_inicio).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    const dt_fimForm = moment(req.body.dt_fim).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    const alunosVigilancia = salaExiste.qt_capacvigilancia;
    const alunosTurma = gradeExiste.qt_alunos;
    if (alunosVigilancia < alunosTurma) {
      return res.status(406).json({ alert: `Quantidade de alunos da turma (${alunosTurma}) é maior que a capacidade permitida pela vigilância! (${alunosVigilancia})` });
    }

    const reservas = await buscarReservaGrupo(idGrupo);

    if (!reservas || reservas.length === 0) {
      return res.status(404).json({ error: "Não há reservas encontradas para o grupo especificado!" });
    }

    for (const reserva of reservas) {

      const reservaAlterada = {
        // nm_reserva: req.body.nm_reserva || reserva.nm_reserva,
        // dt_inicio: dt_inicioForm,
        // dt_fim: dt_fimForm,
        ds_observacao: req.body.ds_observacao || reserva.ds_observacao,
        status_cd: status.cd_status,
        // sala_id: sala.id_sala,
        // grade_id: grade.id_grade,
        // usuario_id: usuario.id_usuario,
      }

      await alterarReserva(reserva.id_reserva, reservaAlterada);
    }

    res.json({
      message: 'Reservas alteradas com sucesso!',
    });

    // Gravar o log da ação
    const acao = 'Alteração realizada nas reservas do grupo com o ID: ' + idGrupo;
    const decode = decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog, ip, acao);

  } catch (error) {
    console.error("Erro ao alterar reservas do grupo:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

    

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
        const decode = decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Reserva deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar sala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})


router.delete("/reservas/grupo/:idGrupo", auth, async (req, res) => {
  try {
    const idGrupo = req.params.idGrupo;
    if (idGrupo < 0) {
      return res.status(404).json({ error: "ID do grupo inválido!" });
    }

    const reservas = await buscarReservaGrupo(idGrupo);
    if (!reservas || reservas.length === 0) {
      return res.status(404).json({ error: "Não há reservas encontradas para o grupo especificado!" });
    }

    for (const reserva of reservas) {
      await deletarReserva(reserva.id_reserva);
    }

    const acao = 'Reservas do grupo com ID ' + idGrupo + ' deletadas.';
    const decode = decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog, ip, acao);

    return res.status(200).json({ message: "Reservas do grupo deletadas com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar reservas do grupo:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = {
    router
}