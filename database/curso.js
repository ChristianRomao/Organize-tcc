const prisma = require ("./prisma");

const listarCursos = () =>{
    return prisma.curso.findMany()
}

const buscarCursoId = (id) =>{
    return prisma.curso.findFirst({
        where:{
            id_curso: id
        }
    });
}

const gravarCurso = (curso) => {
    return prisma.curso.create({
        data:{
            ds_curso: curso.ds_curso
        }
    })
}

const alterarCurso = (id, curso) => {
    return prisma.curso.update({
        where:{
            id_curso: id
        },
        data: curso
    })
}

const deletarCurso = (id) => {
    return prisma.curso.delete({
        where:{
            id_curso:id
        }
    })
}

module.exports = {
    listarCursos,
    buscarCursoId,
    gravarCurso,
    alterarCurso,
    deletarCurso
}