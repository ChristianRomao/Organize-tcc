const prisma = require ("./prisma");

const listarPolos = () =>{
    return prisma.polo.findMany({
            include: {
            instituicao: true,
            municipio:true    
        }
    })
}

const buscarPoloId = (id) =>{
    return prisma.polo.findFirst({
        where:{
            id_polo: id
        },
        include: {
            instituicao: true,  
            municipio:true  
        }
    });
}

const gravarPolo = (polo) => {
    return prisma.polo.create({
        data:{
            nm_polo: polo.nm_polo,
            ds_endereco: polo.ds_endereco,
            municipio_id: polo.municipio_id,
            instituicao_id: polo.instituicao_id
        }
    })
}

const alterarPolo = (id, polo) => {
    return prisma.polo.update({
        where:{
            id_polo: id
        },
        data: polo
    })
}

const deletarPolo = (id) => {
    return prisma.polo.delete({
        where:{
            id_polo:id
        }
    })
}

module.exports = {
    listarPolos,
    buscarPoloId,
    gravarPolo,
    alterarPolo,
    deletarPolo
}