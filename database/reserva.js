const prisma = require("./prisma");

const listarReservas = () => {
  return prisma.reserva.findMany({
    include: {
      status: true,
      sala: {
        include: {
          materiaisSala: {
            include: {
              material: true,
            },
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
      },
      usuario: true,
      grade: {
        include: {
          turma: {
            include: {
              curso:true,
            },
          },
        },
      },
    },
  });
};

const buscarReservaId = (id) => {
  return prisma.reserva.findFirst({
    where: {
      id_reserva: id,
    },
    include: {
      status: true,
      sala: {
        include: {
          materiaisSala: {
            include: {
              material: true,
            },
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
      },
      usuario: true,
      grade: {
        include: {
          turma: {
            include: {
              curso: true,
            },
          },
        },
      },
    },
  });
};

const gravarReserva = (reserva) => {
  return prisma.reserva.create({
    data: {
      dt_inicio: reserva.dt_inicio,
      dt_fim: reserva.dt_fim,
      ds_observacao: reserva.ds_observacao,
      status_cd: reserva.status_cd,
      sala_id: reserva.sala_id,
      grade_id: reserva.grade_id,
      usuario_id: reserva.usuario_id,
    },
  });
};

const alterarReserva = (id, reserva) => {
  return prisma.reserva.update({
    where: {
      id_reserva: id,
    },
    data: reserva,
  });
};

// const deletarReserva = (id) => {
//   return prisma.reserva.delete({
//     where: {
//       id_reserva: id,
//     },
//   });
// };

const buscarReservasPeriodoSala = async (id_sala, dt_inicio, dt_fim) => {
  return prisma.reserva.findMany({
      where: {
          sala_id: id_sala,
          status_cd: "A",
          AND: [
              {
                  OR: [
                      {
                          dt_inicio: {
                              lte: dt_inicio,
                          },
                          dt_fim: {
                              gte: dt_inicio,
                          },
                      },
                      {
                          dt_inicio: {
                              lte: dt_fim,
                          },
                          dt_fim: {
                              gte: dt_fim,
                          },
                      },
                      {
                          dt_inicio: {
                              gte: dt_inicio,
                          },
                          dt_fim: {
                              lte: dt_fim,
                          },
                      },
                  ],
              },
          ],
      },
  });
};

module.exports = {
  listarReservas,
  buscarReservaId,
  buscarReservasPeriodoSala,
  gravarReserva,
  alterarReserva,
  //deletarReserva,
};
