const express = require("express");
const {
    listarLogs,
    buscarLogId,
    gravarLog,
} = require("../database/log");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");

const numeroRegex = /^[0-9]+$/;

router.get("/log", auth, async (req, res) => {
  const logs = await listarLogs();
  res.json({
    logs,
  });
  const acao = ("Consulta realizada na tabela Log.");
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.get("/log/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
  if (!numeroRegex.test(id)) {
    return res.status(400).json({ error: 'Id deve conter apenas números.' });
  }
  const log = await buscarLogId(id);

  if (!log) {
    return res.status(404).json({ error: "Log não encontrado!" });
  }

  res.json({ log: log });
  const acao = ("Consulta realizada na tabela Log, com o id: " + id);
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});


module.exports = {
  router,
};
