const prisma = require("./prisma")

const listarInstituicoes = () =>{
    return prisma.instituicao.findMany()
}

const buscarInstituicaoId = (id) =>{
    return prisma.instituicao.findFirst({
        where:{
            id_instituicao: id
        }
    });
}

const gravarInstituicao = (instituicao) => {
    return prisma.instituicao.create({
        data:instituicao
    })
}

const alterarInstituicao = (id, instituicao) => {
    return prisma.instituicao.update({
        where:{
            id_instituicao: id
        },
        data: instituicao
    })
}

const deletarInstituicao = (id) => {
    return prisma.instituicao.delete({
        where:{
            id_instituicao: id
        }
    })
}

module.exports = {
    listarInstituicoes,
    buscarInstituicaoId,
    gravarInstituicao,
    alterarInstituicao,
    deletarInstituicao
}