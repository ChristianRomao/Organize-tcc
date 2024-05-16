const prisma = require ("./prisma");

const listarMaterialSalas = () =>{
    return prisma.materialSala.findMany({
        include: {
            material: true,    
            sala: true,    
        }
    })
}

const buscarMaterialSalaId = (id) =>{
    return prisma.materialSala.findFirst({
        where:{
            id_materialSala: id
        },
        include: {
            material: true,    
            sala: true,    
        }
    });
}

const gravarMaterialSala = (materialSala) => {
    return prisma.materialSala.create({
        data:{
            qt_materialSala: materialSala.qt_materialSala,
            ds_materialSala: materialSala.ds_materialSala,
            material_id: materialSala.material_id,
            sala_id: materialSala.sala_id
        }
    })
}

const alterarMaterialSala = (id, materialSala) => {
    return prisma.materialSala.update({
        where:{
            id_materialSala: id
        },
        data: materialSala
    })
}

const deletarMaterialSala = (id) => {
    return prisma.materialSala.delete({
        where:{
            id_materialSala:id
        }
    })
}

module.exports = {
    listarMaterialSalas,
    buscarMaterialSalaId,
    gravarMaterialSala,
    alterarMaterialSala,
    deletarMaterialSala
}