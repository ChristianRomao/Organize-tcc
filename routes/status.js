const express = require("express");
const {
    listarStatus,
    buscarStatusId,
    gravarStatus,
    alterarStatus,
    deletarStatus
} = require("../database/status");
const router = express.Router();

router.get("/consulta-status", async (req, res) => {
    const status = await listarStatus();
    res.json({
        status
    });
  });

module.exports = {
    router,
};
  