const express = require("express");
const {
  listarBlocos,
  buscarBlocoId,
  gravarBloco,
  alterarBloco,
  deletarBloco,
} = require("../database/bloco");
const { buscarPoloId } = require("../database/polo");
const router = express.Router();
const {auth} = require("../middleware/auth");

router.get("/bloco", auth, async (req, res) => {
  const blocos = await listarBlocos();
  res.json({
    blocos,
  });
  console.log("Consulta realizada na tabela Bloco.");
});

router.get("/bloco/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const bloco = await buscarBlocoId(id);

  if (!bloco) {
    return res.status(404).json({ error: "Bloco não encontrado!" });
  }

  res.json({ bloco: bloco });
  console.log("Consulta realizada na tabela bloco, com o id: " + id);
});

router.post("/bloco", auth, async (req, res) => {
  try {
    const polo = req.body.polo;
    const poloExiste = await buscarPoloId(polo.id_polo);

    if (!poloExiste) {
      return res.status(404).json({ error: "Polo não encontrado!" });
    }

    const bloco = {
      nm_bloco: req.body.nm_bloco,
      polo_id: polo.id_polo,
    };
    const blocoSalvo = await gravarBloco(bloco);

    res.json({
      bloco: blocoSalvo,
    });
    console.log("Gravação realizada na tabela Bloco");
  } catch (error) {
    console.error("Erro ao gravar Bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/bloco/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const blocoExiste = await buscarBlocoId(id);

    if (!blocoExiste) {
      return res.status(404).json({ error: "Bloco não encontrado!" });
    }

    const polo = req.body.polo_id;
    const poloExiste = await buscarPoloId(polo);

    if (!poloExiste) {
      return res.status(404).json({ error: "Polo não encontrado!" });
    }

    const bloco = {
      nm_bloco: req.body.nm_bloco,
      polo_id: polo,
    };

    const blocoAlterado = await alterarBloco(id, bloco);
    res.json({
      bloco: blocoAlterado,
    });
    console.log("Alteração realizada na tabela bloco, com o id: " + id);
  } catch (error) {
    console.error("Erro ao alterar bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/bloco/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const blocoExiste = await buscarBlocoId(id);

    if (!blocoExiste) {
      return res.status(404).json({ error: "Bloco não encontrado!" });
    }

    await deletarBloco(id);
    console.log("Deletado bloco com o id: " + id);
    return res.status(200).json({ message: "Bloco deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  router,
};
