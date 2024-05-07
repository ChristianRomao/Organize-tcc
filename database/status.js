const prisma = require("./prisma")

const listarStatus = () =>{
    return prisma.status.findMany()
}

const buscarStatusId = (id) =>{
    return prisma.status.findFirst({
        where:{
            cd_status: id
        }
    });
}

const gravarStatus = (status) => {
    return prisma.status.create({
        data:status
    })
}

const alterarStatus = (id, status) => {
    return prisma.status.update({
        where:{
            cd_status: id
        },
        data: status
    })
}

const deletarStatus = (id) => {
    return prisma.status.delete({
        where:{
            cd_status: id
        }
    })
}

module.exports = {
    listarStatus,
    buscarStatusId,
    gravarStatus,
    alterarStatus,
    deletarStatus
}