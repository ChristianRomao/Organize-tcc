const prisma = require ("./prisma");

const listarDisciplinas = () =>{
    return prisma.disciplina.findMany()
}

const buscarDisciplinaId = (id) =>{
    return prisma.disciplina.findFirst({
        where:{
            id_disciplina: id
        }
    });
}

const gravarDisciplina = (disciplina) => {
    return prisma.disciplina.create({
        data:{
            nm_disciplina: disciplina.nm_disciplina
        }
    })
}

const alterarDisciplina = (id, disciplina) => {
    return prisma.disciplina.update({
        where:{
            id_disciplina: id
        },
        data: disciplina
    })
}

const deletarDisciplina = (id) => {
    return prisma.disciplina.delete({
        where:{
            id_disciplina:id
        }
    })
}

module.exports = {
    listarDisciplinas,
    buscarDisciplinaId,
    gravarDisciplina,
    alterarDisciplina,
    deletarDisciplina
}