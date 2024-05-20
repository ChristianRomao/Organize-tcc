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
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/bloco", auth, async (req, res) => {
  const blocos = await listarBlocos();
  res.json({
    blocos,
  });
  const acao = ("Consulta realizada na tabela Bloco.");
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao)
});

router.get("/bloco/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
  if (!numeroRegex.test(id)) {
    return res.status(400).json({ error: 'Id deve conter apenas números.' });
  }
  const bloco = await buscarBlocoId(id);

  if (!bloco) {
    return res.status(404).json({ error: "Bloco não encontrado!" });
  }

  res.json({ bloco: bloco });

  const acao = ("Consulta realizada na tabela bloco, com o id: " + id);
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao)
});

router.post("/bloco", auth, async (req, res) => {
  try {
    if(req.body.nm_bloco === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

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
    const acao = ("Gravação realizada na tabela Bloco");
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
  } catch (error) {
    console.error("Erro ao gravar Bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/bloco/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }

    if(req.body.nm_bloco === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

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
    const acao = ("Alteração realizada na tabela bloco, com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
  } catch (error) {
    console.error("Erro ao alterar bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/bloco/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const blocoExiste = await buscarBlocoId(id);

    if (!blocoExiste) {
      return res.status(404).json({ error: "Bloco não encontrado!" });
    }

    await deletarBloco(id);
    const acao = ("Deletado bloco com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao)
    return res.status(200).json({ message: "Bloco deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar bloco:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = {
  router,
};
