const express = require("express");
const {
  gravarInstituicao,
  listarInstituicoes,
  buscarInstituicaoId,
  alterarInstituicao,
  deletarInstituicao,
} = require("../database/instituicao");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/instituicao", async (req, res) => {
  const instituicoes = await listarInstituicoes();
  res.json({
    instituicoes,
  });
  console.log("Consulta realizada na tabela Instituição.");
});

router.get("/instituicao/:id", async (req, res) => {
  const id = Number(req.params.id);
  const instituicao = await buscarInstituicaoId(id);

  if (!instituicao) {
    return res.status(404).json({ error: "Instituição não encontrada!" });
  }

  res.json({ instituicao: instituicao });
  console.log("Consulta realizada na tabela Instituição, com o id: " + id);
});

router.post("/instituicao", auth, async (req, res) => {
  try {
    const newInstituicaoJSON = JSON.stringify(req.body);
    const newInstituicao = JSON.parse(newInstituicaoJSON);
    const instituicaoSalva = await gravarInstituicao(newInstituicao);

    res.json({
      instituicao: instituicaoSalva,
    });
    console.log("Gravação realizada na tabela Instituição");
  } catch (error) {
    console.error("Erro ao gravar instituição:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/instituicao/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const instituicaoExiste = await buscarInstituicaoId(id);

    if (!instituicaoExiste) {
      return res.status(404).json({ error: "Instituição não encontrada!" });
    }

    const instituicao = {
      nm_razaosoc: req.body.nm_razaosoc,
      cd_cpfcnpj: req.body.cd_cpfcnpj,
      nm_fantasia: req.body.nm_fantasia,
    };

    const instituicaoAlterada = await alterarInstituicao(id, instituicao);
    res.json({
      instituicao: instituicaoAlterada,
    });
    console.log("Alteração realizada na tabela Instituição, com o id: " + id);
  } catch (error) {
    console.error("Erro ao alterar instituição:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/instituicao/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const instituicaoExiste = await buscarInstituicaoId(id);

    if (!instituicaoExiste) {
      return res.status(404).json({ error: "Instituição não encontrada!" });
    }

    await deletarInstituicao(id);
    console.log("Deletada instituição com o id: " + id);
    return res
      .status(200)
      .json({ message: "Instituição deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar instituição:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  router,
};
