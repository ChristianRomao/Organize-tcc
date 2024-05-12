const prisma = require("./prisma");

const listarLogs = () => {
  return prisma.log.findMany({
    include:{
      usuario:true,
    }
  });
};

const buscarLogId = (id) => {
  return prisma.log.findFirst({
    where: {
      id_log: id,
    },
    include:{
      usuario:true,
    }
  });
};

const gravarLog = (userLog,ip,acao) => {
  return prisma.log.create({
    data: {
      usuario_id: userLog,
      dt_log: new Date(),
      nr_ip:ip,
      ds_acao:acao
    },
  });
};

module.exports = {
  listarLogs,
  buscarLogId,
  gravarLog,
};
