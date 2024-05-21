const prisma = require ("./prisma");

const listarSalas = () =>{
    return prisma.sala.findMany({
        include: {
            bloco: {
              include: {
                polo: {
                  include: {
                    instituicao: true,
                    municipio: {
                      include: {
                        estado: true,
                      },
                    },
                  },
                },
              },
            },
          },
    })
}

const buscarSalaId = (id) =>{
    return prisma.sala.findFirst({
        where:{
            id_sala: id
        },
        include: {
            bloco: {
              include: {
                polo: {
                  include: {
                    instituicao: true,
                    municipio: {
                      include: {
                        estado: true,
                      },
                    },
                  },
                },
              },
            },
          },
    });
}

const buscarSalasPorPolo = (poloId) => {
  return prisma.sala.findMany({
      where: {
          bloco: {
              polo_id: poloId,
          },
      },
      include: {
          bloco: {
              include: {
                  polo: {
                      include: {
                          instituicao: true,
                          municipio: {
                              include: {
                                  estado: true,
                              },
                          },
                      },
                  },
              },
          },
      },
  });
};

const gravarSala = (sala) => {
    return prisma.sala.create({
        data:{
            nm_sala: sala.nm_sala,
            qt_capacvigilancia: sala.qt_capacvigilancia,
            bloco_id: sala.bloco_id
        }
    })
}

const alterarSala = (id, sala) => {
    return prisma.sala.update({
        where:{
            id_sala: id
        },
        data: sala
    })
}

const deletarSala = (id) => {
    return prisma.sala.delete({
        where:{
            id_sala:id
        }
    })
}

module.exports = {
    listarSalas,
    buscarSalaId,
    buscarSalasPorPolo,
    gravarSala,
    alterarSala,
    deletarSala
}