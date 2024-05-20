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
const {cpf,cnpj} = require('brazilian-doc-validator');
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

router.get("/instituicao", auth, async (req, res) => {
  const instituicoes = await listarInstituicoes();
  res.json({
    instituicoes,
  });
  const acao = ("Consulta realizada na tabela Instituição.");
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.get("/instituicao/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
  if (!numeroRegex.test(id)) {
    return res.status(400).json({ error: 'Id deve conter apenas números.' });
  }
  const instituicao = await buscarInstituicaoId(id);

  if (!instituicao) {
    return res.status(404).json({ error: "Instituição não encontrada!" });
  }

  res.json({ instituicao: instituicao });
  const acao = ("Consulta realizada na tabela Instituição, com o id: " + id);
  const decode = await decodeJWT(req.headers.authorization);
  const userLog = decode.id_usuario;
  const ip = req.ip;
  await gravarLog(userLog,ip,acao);
});

router.post("/instituicao", auth, async (req, res) => {
  try {
    if(req.body.cd_cpfcnpj === '' || req.body.nm_razaosoc === '' || req.body.nm_fantasia === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }
    const cpfcnpj = req.body.cd_cpfcnpj

        if(isNaN(cpfcnpj)){
          return res.status(400).json({ error: "CPF/CNPJ deve ser um número" });
        }

        // if(cpfcnpj.length == 11){
        //     const cpfValidado = cpf.validate(cpfcnpj);

        //     if(!cpfValidado){
        //         return res.status(404).json({error:"CPF inválido!"});
        //     }
        // }else if(cpfcnpj.length == 14){
        //     const cnpjValidado = cnpj.validate(cpfcnpj);

        //     if(!cnpjValidado){
        //         return res.status(404).json({error:"CNPJ inválido!"});
        //     }
        // }else{
        //     return res.status(404).json({error:"CPF/CNPJ inválido!"});
        // }

        const instituicao = {
          cd_cpfcnpj: cpfcnpj,
          nm_razaosoc: req.body.nm_razaosoc,
          nm_fantasia: req.body.nm_fantasia
      }
      const instituicaoSalva = await gravarInstituicao(instituicao);

      res.status(201).json({
          instituicao: instituicaoSalva,
          message: 'Instituição gravada com sucesso!'
      });
    const acao = ("Gravação realizada na tabela Instituição");
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
  } catch (error) {
    console.error("Erro ao gravar instituição:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/instituicao/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const instituicaoExiste = await buscarInstituicaoId(id);

    if (!instituicaoExiste) {
      return res.status(404).json({ error: "Instituição não encontrada!" });
    }

    if(req.body.cd_cpfcnpj === '' || req.body.nm_razaosoc === '' || req.body.nm_fantasia === ''){
      return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
    }

    const cpfcnpj = req.body.cd_cpfcnpj

    if(isNaN(cpfcnpj)){
      return res.status(400).json({ error: "CPF/CNPJ deve ser um número" });
    }

    // if(cpfcnpj.length == 11){
    //     const cpfValidado = cpf.validate(cpfcnpj);

    //     if(!cpfValidado){
    //         return res.status(404).json({error:"CPF inválido!"});
    //     }
    // }else if(cpfcnpj.length == 14){
    //     const cnpjValidado = cnpj.validate(cpfcnpj);

    //     if(!cnpjValidado){
    //         return res.status(404).json({error:"CNPJ inválido!"});
    //     }
    // }else{
    //     return res.status(404).json({error:"CPF/CNPJ inválido!"});
    // }

    const instituicao = {
      nm_razaosoc: req.body.nm_razaosoc,
      cd_cpfcnpj: cpfcnpj,
      nm_fantasia: req.body.nm_fantasia,
    };

    const instituicaoAlterada = await alterarInstituicao(id, instituicao);
    res.json({
      instituicao: instituicaoAlterada,
      message: 'Instituição alterada com sucesso!'
    });
    const acao = ("Alteração realizada na tabela Instituição, com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
  } catch (error) {
    console.error("Erro ao alterar instituição:" + error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/instituicao/:id", auth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
      return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const instituicaoExiste = await buscarInstituicaoId(id);

    if (!instituicaoExiste) {
      return res.status(404).json({ error: "Instituição não encontrada!" });
    }

    await deletarInstituicao(id);
    const acao = ("Deletada instituição com o id: " + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
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
