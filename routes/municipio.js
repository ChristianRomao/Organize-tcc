const express = require("express");
const {
  listarMunicipios,
  buscarMunicipioId,
  gravarMunicipio,
  alterarMunicipio,
  deletarMunicipio,
  buscarDetalhesEstado,
} = require("../database/municipio");
const {buscarEstadoId} = require("../database/estado");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/municipio", async (req, res) => {
  try {
    const municipios = await listarMunicipios();
    const municipiosComDetalhes = await Promise.all(
      municipios.map(async (municipio) => {
        const detalhesEstado = await buscarDetalhesEstado(municipio.estado_cd);
        return {
          ...municipio,
          DetalhesEstado: detalhesEstado,
        };
      })
    );

    res.json({
      Municipios: municipiosComDetalhes,
    });
    console.log("Consulta completa realizada para todos os municípios");
  } catch (error) {
    console.error("Erro ao consultar todos os municípios:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/municipio/:id", async (req, res) => {
  const id = Number(req.params.id);
  const municipio = await buscarMunicipioId(id);

  if (!municipio) {
    return res.status(404).json({ error: "Municipio não encontrado!" });
  }

  const detalhesEstado = await buscarDetalhesEstado(municipio.estado_cd);

    res.json({ 
      Municipio: municipio,
      DetalhesEstado: detalhesEstado
    });
  console.log("Consulta realizada na tabela Municipio, com o id: " + id);
});

router.post("/municipio", auth, async (req, res) => {
  try {
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
    console.log("Gravação realizada na tabela Municipio");
  } catch (error) {
    console.error("Erro ao gravar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/municipio/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const municipioExiste = await buscarMunicipioId(id);

    if (!municipioExiste) {
      return res.status(404).json({ error: "Municipio não encontrado!" });
    }

    const municipio = {
      nm_municipio: req.body.nm_municipio,
    };

    const municipioAlterado = await alterarMunicipio(id, municipio);
    res.json({
      municipio: municipioAlterado,
    });
    console.log("Alteração realizada na tabela Municipio, com o id: " + id);
  } catch (error) {
    console.error("Erro ao alterar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/municipio/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const municipioExiste = await buscarMunicipioId(id);

    if (!municipioExiste) {
      return res.status(404).json({ error: "Municipio não encontrado!" });
    }

    await deletarMunicipio(id);
    console.log("Deletado municipio com o id: " + id);
    return res.status(200).json({ message: "Municipio deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar municipio:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  router,
};
