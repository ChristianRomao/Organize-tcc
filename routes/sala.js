const express = require("express");
const {
    listarSalas,
    buscarSalaId,
    buscarSalasPorPolo,
    gravarSala,
    alterarSala,
    deletarSala
} = require("../database/sala");
const {buscarBlocoId} = require("../database/bloco");
const router = express.Router();
const {auth} = require("../middleware/auth");
const { decodeJWT } = require("./decode");
const { gravarLog } = require("../database/log");

const numeroRegex = /^[0-9]+$/;

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const decode = decodeJWT(req.headers.authorization);
            const userPermissions = decode.ds_funcao;

            if (!userPermissions.includes(requiredPermission)) {
                return res.status(403).json({ error: "Acesso negado. Permissões insuficientes." });
            }

            next();
        } catch (error) {
            console.error("Erro ao verificar permissões:", error);
            res.status(500).json({ message: "Erro interno do servidor" });
        }
    };
};

router.get("/sala", auth, async (req,res) => {
    const salas = await listarSalas()
    res.json({
        salas,
    });
    const acao = ('Consulta realizada na tabela Sala.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/sala/polo", auth, async (req,res) => {
    const salas = await listarSalas()
    res.json({
        salas,
    });
    const acao = ('Consulta realizada na tabela Sala.');
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

//Realiza consulta sem gravar log
router.get("/consulta-sala", auth, async (req,res) => {
    const salas = await listarSalas()
    res.json({
        salas,
    });
});

router.get("/consulta-sala/polo", auth, async (req,res) => {
    const salas = await listarSalas()
    res.json({
        salas,
    });
});

router.get("/sala/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const sala = await buscarSalaId(id)

    if(!sala){
        return res.status(404).json({error:"Sala não encontrada!"});
    }

    res.json({sala : sala});
    const acao = ('Consulta realizada na tabela sala, com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/consulta-sala/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const sala = await buscarSalaId(id)

    if(!sala){
        return res.status(404).json({error:"Sala não encontrada!"});
    }
    res.json({sala : sala});
});

router.get("/sala/polo/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const salas = await buscarSalasPorPolo(id)

    if(!salas){
        return res.status(404).json({error:"Sala não encontrada!"});
    }

    res.json({salas});
    const acao = ('Consulta realizada na tabela sala para o polo com o id: ' + id);
    const decode = await decodeJWT(req.headers.authorization);
    const userLog = decode.id_usuario;
    const ip = req.ip;
    await gravarLog(userLog,ip,acao);
});

router.get("/consulta-sala/polo/:id", auth, async (req,res) => {
    const id = Number(req.params.id);
    if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
    if (!numeroRegex.test(id)) {
        return res.status(400).json({ error: 'Id deve conter apenas números.' });
    }
    const salas = await buscarSalasPorPolo(id)

    if(!salas){
        return res.status(404).json({error:"Sala não encontrada!"});
    }

    res.json({salas});
});

router.post("/sala", auth, checkPermission('admin'), async (req,res) => {
    try{
        if(req.body.nm_sala === '' || req.body.qt_capacvigilancia === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const bloco = req.body.bloco;
        const blocoExiste = await buscarBlocoId(bloco.id_bloco)
    
        if(!blocoExiste){
          return res.status(404).json({ error: "Bloco não encontrado!" });
        }

        if(req.body.qt_capacvigilancia <= 0){
            return res.status(400).json({ error: "Quantidade inválida!" });
        }

        const sala = {
            nm_sala: req.body.nm_sala,
            qt_capacvigilancia: req.body.qt_capacvigilancia,
            bloco_id: bloco.id_bloco,
        }
        const salaSalva = await gravarSala(sala);

        res.json({
            sala: salaSalva,
            message: 'Sala gravada com sucesso!',
        });
        const acao = ('Gravação realizada na tabela Sala');
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error){
        console.error('Erro ao gravar Sala:'+ error);
        res.status(500).json({message:"Server Error"});
    }
})

router.put("/sala/:id", auth, async (req,res) => {
    try{

        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const salaExiste = await buscarSalaId(id);
        
        if(!salaExiste){
            return res.status(404).json({error:"Sala não encontrada!"});
        }

        if(req.body.nm_sala === '' || req.body.qt_capacvigilancia === ''){
            return res.status(400).json({ error: "Campos obrigatórios devem ser preenchidos!" });
        }

        const bloco = req.body.bloco_id;
        const blocoExiste = await buscarBlocoId(bloco)
    
        if(!blocoExiste){
          return res.status(404).json({ error: "Bloco não encontrado!" });
        }

        if(req.body.qt_capacvigilancia <= 0){
            return res.status(400).json({ error: "Quantidade inválida!" });
        }
        
        const sala = {
            nm_sala: req.body.nm_sala,
            qt_capacvigilancia: req.body.qt_capacvigilancia,
            bloco_id: bloco,
        }
        
        const salaAlterada = await alterarSala(id, sala);
        res.json({
            sala: salaAlterada,
            message: 'Sala alterada com sucesso!',
        })
        const acao = ('Alteração realizada na tabela sala, com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
    }catch (error) {
        console.error("Erro ao alterar sala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
    })

router.delete("/sala/:id", auth, async (req,res) => {
    try{
        const id = Number(req.params.id);
        if(id < 0) return res.status(404).json({ error: "Id para consulta inválido!" });
        if (!numeroRegex.test(id)) {
            return res.status(400).json({ error: 'Id deve conter apenas números.' });
        }
        const salaExiste = await buscarSalaId(id);
        
        if(!salaExiste){
            return res.status(404).json({error:"Sala não encontrada!"});
        }

        await deletarSala(id);
        const acao = ('Deletada sala com o id: ' + id);
        const decode = await decodeJWT(req.headers.authorization);
        const userLog = decode.id_usuario;
        const ip = req.ip;
        await gravarLog(userLog,ip,acao);
        return res.status(200).json({ message: "Sala deletada com sucesso!" });
    }catch (error) {
        console.error("Erro ao deletar sala:" + error);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = {
    router
}