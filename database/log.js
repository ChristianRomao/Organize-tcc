const prisma = require("./prisma");
const moment = require('moment');

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
  let dt_log = new Date().toLocaleString('pt-BR')
  const [dia, hora] = dt_log.split(', ');
  const data = `${moment(dia, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${hora}.000Z`;

  return prisma.log.create({
    data: {
      usuario_id: userLog,
      dt_log: data,
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
