const jwt = require('jsonwebtoken');

// Função para decodificar o token JWT e obter as informações do usuário
function decodeJWT(token) {
    try {
        const tokenFormat = token.split(" ")[1]
        // Decodifica o token JWT usando a chave secreta fornecida
        const decoded = jwt.verify(tokenFormat,process.env.SECRET);

        // Retorna as informações do usuário do payload do token
        return decoded;
    } catch (error) {
        // Se houver um erro ao decodificar o token (por exemplo, token inválido), retorne null
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

module.exports = {
    decodeJWT
};
