const prisma = require ("./prisma");

const listarMateriais = () =>{
    return prisma.material.findMany()
}

const buscarMaterialId = (id) =>{
    return prisma.material.findFirst({
        where:{
            id_material: id
        }
    });
}

const gravarMaterial = (material) => {
    return prisma.material.create({
        data:{
            ds_material: material.ds_material
        }
    })
}

const alterarMaterial = (id, material) => {
    return prisma.material.update({
        where:{
            id_material: id
        },
        data: material
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
    gravarMaterial,
    alterarMaterial,
    deletarMaterial
}