const prisma = require ("./prisma");

const listarTurmas = () =>{
    return prisma.turma.findMany({
        include: {
            curso: true,
        }
    })
}

const buscarTurmaId = (id) =>{
    return prisma.turma.findFirst({
        where:{
            id_turma: id
        },
        include: {
            curso: true,
        }
    });
}

const buscarTurmaAno = (ano) =>{
    return prisma.turma.findMany({
        where:{
            nr_anoletivo: ano
        },
        include: {
            curso: true,
        }
    });
}

const gravarTurma = (turma) => {
    return prisma.turma.create({
        data:{
            ds_turma: turma.ds_turma,
            nr_anoletivo: turma.nr_anoletivo,
            curso_id: turma.curso_id,
        }
    })
}

const alterarTurma = (id, turma) => {
    return prisma.turma.update({
        where:{
            id_turma: id
        },
        data: turma
    })
}

const deletarTurma = (id) => {
    return prisma.turma.delete({
        where:{
            id_turma:id
        }
    })
}

module.exports = {
    listarTurmas,
    buscarTurmaId,
    buscarTurmaAno,
    gravarTurma,
    alterarTurma,
    deletarTurma
}