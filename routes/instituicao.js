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


router.get("/instituicao", auth, async (req, res) => {
  const instituicoes = await listarInstituicoes();
  res.json({
    instituicoes,
  });
  console.log("Consulta realizada na tabela Instituição.");
});

router.get("/instituicao/:id", auth, async (req, res) => {
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
    const cpfcnpj = req.body.cd_cpfcnpj

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

    const cpfcnpj = req.body.cd_cpfcnpj

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
