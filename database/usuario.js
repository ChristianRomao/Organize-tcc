const prisma = require ("./prisma");

const listarUsuarios = () =>{
    return prisma.usuario.findMany({
        orderBy:{
            nm_usuario:'asc'
        }
    })
}

const buscarUsuarioId = (id) =>{
    return prisma.usuario.findFirst({
        where:{
            id_usuario: id
        }
    });
}

const buscarEmail = (email) => {
    return prisma.usuario.findUnique({
        where: {
            ds_email: email,
        }
    })
}
const buscarCpfCnpj = (cdCpfCnpj) => {
    return prisma.usuario.findUnique({
        where: {
            cd_cpfcnpj: cdCpfCnpj,
        }
    })
}

const gravarUsuario = (usuario) => {
    return prisma.usuario.create({
        data:{
            cd_cpfcnpj: usuario.cd_cpfcnpj,
            nm_usuario: usuario.nm_usuario,
            dt_nascimento: usuario.dt_nascimento,
            ds_email: usuario.ds_email,
            ds_senha: usuario.ds_senha,
            ds_funcao: usuario.ds_funcao
        }
    })
}

const alterarUsuario = (id, usuario) => {
    return prisma.usuario.update({
        where:{
            id_usuario: id
        },
        data: usuario
    })
}

const deletarUsuario = (id) => {
    return prisma.usuario.delete({
        where:{
            id_usuario:id
        }
    })
}

module.exports = {
    listarUsuarios,
    buscarUsuarioId,
    buscarEmail,
    buscarCpfCnpj,
    gravarUsuario,
    alterarUsuario,
    deletarUsuario
}