const prisma = require("./prisma");
const moment = require('moment-timezone');

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
          disciplina: true,
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
          disciplina: true,
        },
      },
    },
  });
};

const buscarReservaNome = async (nome) => {
  const reservas = await prisma.reserva.findMany({
    where: {
      nm_reserva:{
        contains:nome
      }
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
          disciplina: true,
        },
      },
    },
  });
  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});

  return Object.values(groupedReservas);

};

const buscarReservaSala = async (nome) => {
  const reservas = await prisma.reserva.findMany({
    where: {
      sala:{
        nm_sala:{
          contains:nome
        }
      }
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
          disciplina: true,
        },
      },
    },
  });
  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});

  return Object.values(groupedReservas);

};

const buscarReservaUsuario = async (nome) => {
  const reservas = await prisma.reserva.findMany({
    where: {
      usuario:{
        nm_usuario:{
          contains:nome
        }
      }
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
          disciplina: true,
        },
      },
    },
  });
  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});

  return Object.values(groupedReservas);

};

const buscarReservaCurso = async (nome) => {
  const reservas = await prisma.reserva.findMany({
    where: {
      grade:{
        turma:{
          curso:{
            ds_curso:{
              contains: nome
            }
          }
        }
      }
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
          disciplina: true,
        },
      },
    },
  });
  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});

  return Object.values(groupedReservas);

};

const buscarReservaStatus = async (status) => {
  const reservas = await prisma.reserva.findMany({
    where: {
      status_cd:status
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
          disciplina: true,
        },
      },
    },
  });
  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});

  return Object.values(groupedReservas);

};

const buscarReservasPeriodoSala = async (id_sala, dt_inicio, dt_fim) => {
  return prisma.reserva.findMany({
    where: {
      sala_id: id_sala,
      status_cd: "A",
      OR: [
        {
          dt_inicio: {
            lte: dt_fim, 
          },
          dt_fim: {
            gte: dt_inicio, 
          },
        },
      ],
    },
  });
};

/*const buscarReservaGrupo = (grupoId) => {
  return prisma.reserva.findMany({
    where: {
      id_grupo:grupoId
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
};*/

const buscarReservaGrupo = (grupoId) => {
  return prisma.reserva.findMany({
    where: {
      id_grupo:grupoId
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
          disciplina: true,
        },
      },
    },
  });
  // if (reservas.length === 0) {
  //   return null;
  // }

  // const groupedReserva = reservas.reduce((acc, reserva) => {
  //   if (!acc) {
  //     acc = {
  //       id_grupo: reserva.id_grupo,
  //       dt_inicio: reserva.dt_inicio,
  //       dt_fim: reserva.dt_fim,
  //       status: reserva.status,
  //       sala: reserva.sala,
  //       usuario: reserva.usuario,
  //       grade: reserva.grade,
  //       ds_observacao: reserva.ds_observacao,
  //       nm_reserva: reserva.nm_reserva
  //     };
  //   } else {
  //     acc.dt_inicio = new Date(Math.min(new Date(acc.dt_inicio), new Date(reserva.dt_inicio)));
  //     acc.dt_fim = new Date(Math.max(new Date(acc.dt_fim), new Date(reserva.dt_fim)));
  //   }
  //   return acc;
  // }, null);

  // return groupedReserva;
};


const listarReservasGrupo = async () => {
  const reservas = await prisma.reserva.findMany({
    include: {
      status: true,
      sala: {
        include: {
          materiaisSala: {
            include: {
              material: true,
            },
          },
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
          disciplina: true,
        },
      },
    },
  });

  const groupedReservas = reservas.reduce((acc, reserva) => {
    if (!acc[reserva.id_grupo]) {
      acc[reserva.id_grupo] = {
        id_grupo: reserva.id_grupo,
        dt_inicio: reserva.dt_inicio,
        dt_fim: reserva.dt_fim,
        status: reserva.status,
        sala: reserva.sala,
        usuario: reserva.usuario,
        disciplina: reserva.disciplina,
        grade: reserva.grade,
        ds_observacao: reserva.ds_observacao,
        nm_reserva: reserva.nm_reserva
      };
    } else {
      acc[reserva.id_grupo].dt_inicio = new Date(Math.min(new Date(acc[reserva.id_grupo].dt_inicio), new Date(reserva.dt_inicio)));
      acc[reserva.id_grupo].dt_fim = new Date(Math.max(new Date(acc[reserva.id_grupo].dt_fim), new Date(reserva.dt_fim)));
    }
    return acc;
  }, {});
  const sortedReservas = Object.values(groupedReservas).sort((a, b) => new Date(a.dt_inicio) - new Date(b.dt_inicio));

  return sortedReservas;
};

const gravarReserva = (reserva) => {

  const dt_inicio = moment(reserva.dt_inicio).utcOffset(-3);
  const dt_fim = moment(reserva.dt_fim).utcOffset(-3);

  return prisma.reserva.create({
    data: {
      nm_reserva: reserva.nm_reserva,
      dt_inicio: dt_inicio,
      dt_fim: dt_fim,
      ds_observacao: reserva.ds_observacao,
      id_grupo: reserva.id_grupo,
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

const deletarReserva = (id) => {
  return prisma.reserva.delete({
    where: {
      id_reserva: id,
    },
  });
};

/*const buscarReservasPeriodoSala = async (id_sala, dt_inicio, dt_fim) => {
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
};*/


module.exports = {
  listarReservas,
  listarReservasGrupo,
  buscarReservaId,
  buscarReservasPeriodoSala,
  buscarReservaNome,
  buscarReservaGrupo,
  buscarReservaSala,
  buscarReservaUsuario,
  buscarReservaCurso,
  buscarReservaStatus,
  gravarReserva,
  alterarReserva,
  deletarReserva,
};
