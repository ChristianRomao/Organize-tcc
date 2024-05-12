const express = require("express");
const cors = require("cors"); // Importe o pacote cors
const instituicaoRoutes = require("./routes/instituicao");
const estadoRoutes = require("./routes/estado");
const municipioRoutes = require("./routes/municipio");
const materialRoutes = require("./routes/material");
const disciplinaRoutes = require("./routes/disciplina");
const cursoRoutes = require("./routes/curso");
const poloRoutes = require("./routes/polo");
const turmaRoutes = require("./routes/turma");
const gradeRoutes = require("./routes/grade");
const blocoRoutes = require("./routes/bloco");
const salaRoutes = require("./routes/sala");
const materialSalaRoutes = require("./routes/materialSala");
const usuarioRoutes = require("./routes/usuario");
const reservaRoutes = require("./routes/reserva");
const logRoutes = require("./routes/log");
const popularTabelas = require("./popularTabelas");


const server = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Permitir apenas solicitações deste domínio
  methods: ['GET', 'POST','PUT','DELETE'], // Permitir apenas os métodos GET e POST
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(instituicaoRoutes.router);
server.use(estadoRoutes.router);
server.use(municipioRoutes.router);
server.use(materialRoutes.router);
server.use(disciplinaRoutes.router);
server.use(cursoRoutes.router);
server.use(poloRoutes.router);
server.use(turmaRoutes.router);
server.use(gradeRoutes.router);
server.use(blocoRoutes.router);
server.use(salaRoutes.router);
server.use(materialSalaRoutes.router);
server.use(usuarioRoutes.router);
server.use(reservaRoutes.router);
server.use(logRoutes.router);

popularTabelas();

module.exports = {
  server,
};