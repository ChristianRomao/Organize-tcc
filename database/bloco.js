const prisma = require("./prisma");

const listarBlocos = () => {
  return prisma.bloco.findMany({
        include: {
            polo: true,    
        },
        orderBy: [
          {
            polo: {
              nm_polo: 'asc',
            },
          },
          {
            nm_bloco: 'asc',
          },
        ],
  });
};

const buscarBlocoId = (id) => {
  return prisma.bloco.findFirst({
    where: {
      id_bloco: id,
    },
    include: {
        polo: true,    
    }
  });
};

const gravarBloco = (bloco) => {
  return prisma.bloco.create({
    data: {
      nm_bloco: bloco.nm_bloco,
      polo_id: bloco.polo_id,
    },
  });
};

const alterarBloco = (id, bloco) => {
  return prisma.bloco.update({
    where: {
      id_bloco: id,
    },
    data: bloco,
  });
};

const deletarBloco = (id) => {
  return prisma.bloco.delete({
    where: {
      id_bloco: id,
    },
  });
};

module.exports = {
  listarBlocos,
  buscarBlocoId,
  gravarBloco,
  alterarBloco,
  deletarBloco,
};
