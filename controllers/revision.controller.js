const db = require("../models/");


const allRevision_by_idTarea = async (req, res) => {
    try {
        const allRevision = await db.revision.findAll({
            where: {
                isDelete: false,
                idTarea : req.params.idTarea
            }
        })
        return res.status(200).json(allRevision);
    } catch (error) {
        res.status(500).json({
            message: 'error en la petición' + error
        })
    }
};



const newRevision = async (req, res) => {
    try {
        const revision = await db.revision.findOne({
            where:{
                idTarea:req.body.idTarea,
                isDelete:false
            }
        })
        if(revision){return res.status(403).send({message:'revision ya existe'})};

        await db.revision.create({
            nombre: req.body.nombre,
            nombre_aprobado: req.body.nombre_aprobado,

            descripcion: req.body.descripcion,
            descripcion_aprobado: req.body.descripcion_aprobado,

            cantidad: req.body.cantidad,
            cantidad_aprobado: req.body.cantidad_aprobado,

            costoUnitario: req.body.costoUnitario,
            costoUnitario_aprobado: req.body.costoUnitario_aprobado,

            objeto_grupo: req.body.objeto_grupo,
            objeto_grupo_aprobado: req.body.objeto_grupo_aprobado,

            grupo_gasto: req.body.grupo_gasto,
            grupo_gasto_aprobado: req.body.grupo_gasto_aprobado,

            unidad_medida: req.body.unidad_medida,
            unidad_medida_aprobado: req.body.unidad_medida_aprobado,

            fuente: req.body.fuente,
            fuente_aprobado: req.body.fuente_aprobado,

            idTarea:req.body.idTarea
        })
        res.status(200).json({
            message: 'revision creada con éxito'
        })

    } catch (error) {
        res.status(500).json({
            message: 'error al ingresar' + error
        })
    }
};

const updateRevision = async (req, res) => {
    try {
        const revision = await db.revision.findOne({
            where:{
                idTarea:req.body.idTarea
            }
        })
        if(!revision){return res.status(404).send({message:'revision no encontrada'})};

        await db.revision.create({
            nombre: req.body.nombre,
            nombre_aprobado: req.body.nombre_aprobado,

            descripcion: req.body.descripcion,
            descripcion_aprobado: req.body.descripcion_aprobado,

            cantidad: req.body.cantidad,
            cantidad_aprobado: req.body.cantidad_aprobado,

            costoUnitario: req.body.costoUnitario,
            costoUnitario_aprobado: req.body.costoUnitario_aprobado,

            objeto_grupo: req.body.objeto_grupo,
            objeto_grupo_aprobado: req.body.objeto_grupo_aprobado,

            grupo_gasto: req.body.grupo_gasto,
            grupo_gasto_aprobado: req.body.grupo_gasto_aprobado,

            unidad_medida: req.body.unidad_medida,
            unidad_medida_aprobado: req.body.unidad_medida_aprobado,

            fuente: req.body.fuente,
            fuente_aprobado: req.body.fuente_aprobado
        },{
            where:{
                id:revision.id
            }
        })
        res.status(200).json({
            message: 'revision actualizada con éxito'
        })

    } catch (error) {
        res.status(500).json({
            message: 'error al ingresar' + error
        })
    }
};

const deleteRevision = async (req, res) => {
    try{
        const revision = await db.revision.findOne({
            where:{
                idTarea:req.params.id,
                isDelete:false
            }
        })
        if(!revision){return res.status(404).send({message:'revision no encontrada'})};
        await db.revision.update({
            isDelete:true
        },{
            where:{
                id:revision.id
            }
        }) 
        return res.status(200).send({message:'ok'});
    }catch(e){
        return res.status(500).send({message:'Server error '+e})
    }
}


module.exports = {
    allRevision_by_idTarea,
    newRevision,
    updateRevision,
    deleteRevision
}