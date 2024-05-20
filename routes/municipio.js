const express = require("express");
const {
  listarMunicipios,
  buscarMunicipioId,
  gravarMunicipio,
  alterarMunicipio,
  deletarMunicipio,
} = require("../database/municipio");
const {buscarEstadoId} = require("../database/estado");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/municipio", auth, async (req, res) => {
  try {
    const municipios = await listarMunicipios();
    res.json({
      municipios,
  });
    const acao = ("Consulta realizada na tabela Municipio.");
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
  } catch (error) {
    console.error("Erro ao consultar todos os municípios:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Realiza consulta sem gravar o log
router.get("/consulta-municipio", auth, async (req, res) => {
  try {
    const municipios = await listarMunicipios();
    res.json({
      municipios,
  });
  } catch (error) {
    console.error("Erro ao consultar todos os municípios:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/municipio/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
  if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
  }
  const municipio = await buscarMunicipioId(id);

  if (!municipio) {
    return res.status(404).json({ error: "Municipio não encontrado!" });
  }

    res.json({ 
      municipio: municipio,
    });
  const acao = ("Consulta realizada na tabela Municipio, com o id: " + id);
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.post("/municipio", auth, async (req, res) => {
  try {
    if(req.body.nm_municipio === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

    const estado = req.body.estado;

    const estadoExiste = await buscarEstadoId(estado.cd_estado)

    if(!estadoExiste){
      return res.status(404).json({ error: "Estado não encontrado!" });
    }

    const municipio = {
      nm_municipio: req.body.nm_municipio,
      estado_cd: estado.cd_estado,
    };
    const municipioSalvo = await gravarMunicipio(municipio);

    res.json({
      municipio: municipioSalvo,
    });
    const acao = ("Gravação realizada na tabela Municipio");
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
  } catch (error) {
    console.error("Erro ao gravar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/municipio/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const municipioExiste = await buscarMunicipioId(id);

    if (!municipioExiste) {
      return res.status(404).json({ error: "Municipio não encontrado!" });
    }

    if(req.body.nm_municipio === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

    const municipio = {
      nm_municipio: req.body.nm_municipio,
    };

    const municipioAlterado = await alterarMunicipio(id, municipio);
    res.json({
      municipio: municipioAlterado,
    });
    const acao = ("Alteração realizada na tabela Municipio, com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
  } catch (error) {
    console.error("Erro ao alterar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/municipio/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const municipioExiste = await buscarMunicipioId(id);

    if (!municipioExiste) {
      return res.status(404).json({ error: "Municipio não encontrado!" });
    }

    await deletarMunicipio(id);
    const acao = ("Deletado municipio com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
    return res.status(200).json({ message: "Municipio deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  router,
};
