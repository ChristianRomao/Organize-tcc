const prisma = require ("./prisma");

const listarEstados = () =>{
    return prisma.estado.findMany()
}

const buscarEstadoId = (id) =>{
    return prisma.estado.findFirst({
        where:{
            cd_estado: id
        }
    });
}

const gravarEstado = (estado) => {
    return prisma.estado.create({
        data:estado
    })
}

const alterarEstado = (id, estado) => {
    return prisma.estado.update({
        where:{
            cd_estado: id
        },
        data: estado
    })
}

module.exports = {
    listarEstados,
    buscarEstadoId,
    gravarEstado,
    alterarEstado
}