const prisma = require ("./prisma");

const listarMateriais = () =>{
    return prisma.material.findMany({
        orderBy:{
            ds_material: 'asc',
        }
    })
}

const buscarMaterialId = (id) =>{
    return prisma.material.findFirst({
        where:{
            id_material: id
        }
    });
}

const buscarMaterialNome = (descricao) =>{
    return prisma.material.findMany({
        where:{
            ds_material:{
                contains:descricao
            }
        }
    });
}

const gravarMaterial = (material) => {
    return prisma.material.create({
        data:{
            ds_material: material.ds_material,
            qt_material: material.qt_material
        }
    })
}

const alterarMaterial = (id, material) => {
    return prisma.material.update({
        where:{
            id_material: id
        },
        data:{
            ds_material: material.ds_material,
            qt_material: material.qt_material
        }
    })
}

const deletarMaterial = (id) => {
    return prisma.material.delete({
        where:{
            id_material:id
        }
    })
}

module.exports = {
    listarMateriais,
    buscarMaterialId,
    buscarMaterialNome,
    gravarMaterial,
    alterarMaterial,
    deletarMaterial
}