const prisma = require ("./prisma");

const listarMunicipios = () =>{
    return prisma.municipio.findMany({
        include: {
            estado: true,    
        }
    })
}

const buscarMunicipioId = (id) =>{
    return prisma.municipio.findFirst({
        where:{
            id_municipio: id
        },
        include: {
            estado: true,    
        }
    });
}

const gravarMunicipio = (municipio) => {
    return prisma.municipio.create({
        data:{
            nm_municipio:municipio.nm_municipio,
            estado_cd:municipio.estado_cd
        }
    })
}

const alterarMunicipio = (id, municipio) => {
    return prisma.municipio.update({
        where:{
            id_municipio: id
        },
        data: municipio
    })
}

const deletarMunicipio = (id) => {
    return prisma.municipio.delete({
        where:{
            id_municipio:id
        }
    })
}

const buscarDetalhesEstado = async (cdEstado) => {
    const estado = await prisma.estado.findFirst({
      where: {
        cd_estado: cdEstado,
      },
    });
    return estado;
  };

module.exports = {
    listarMunicipios,
    buscarMunicipioId,
    gravarMunicipio,
    alterarMunicipio,
    deletarMunicipio,
    buscarDetalhesEstado
}