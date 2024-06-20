const jwt = require('jsonwebtoken');

function decodeJWT(token) {
    try {
        const tokenFormat = token.split(" ")[1]
        const decoded = jwt.verify(tokenFormat,process.env.SECRET);

        return decoded;
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

module.exports = {
    decodeJWT
};
