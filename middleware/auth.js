const jwt = require("jsonwebtoken");

const auth = (req,res,next) =>{
    try{
        if(!req.headers.authorization) return res.status(401).send("Não autorizado. Token inválido.");
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        req.usuario = payload;
        next();
    }catch{
        return res.status(401).send("Message test");

    }
}

module.exports = {auth}