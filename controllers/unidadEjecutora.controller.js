const db = require("../models");

//Funcion para crear una nueva Institucion
const new_ue = async (req,res) =>{
    try{
        const ejecutora = await db.ue.findOne({where:{name:req.body.nombre}})
        if(ejecutora){
            return res.status(400).json({message:'Nombre de Unidad ya utilizado'});
        }
        await db.ue.create({
            name: req.body.nombre,
            descripcion: req.body.descripcion,
            idInstitucion:req.body.idInstitucion
        });
        return res.status(200).json({status:"Ok"});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para obtener una unica Institucion
const get_ue= async (req,res) =>{
    try{
        const ejecutora = await db.ue.findByPk(req.params.id)
        if(!ejecutora){
            return res.status(404).json({message:'No se encuentra esa Institucion'});
        }
        return res.status(200).json(ejecutora);
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}
//Funcion para obtener todas las Instituciones
const get_all_ue = async (req,res) =>{
    try{
        const all_Ejecutora = await db.ue.findAll({
            where:{isDelete:false,
            idInstitucion:req.params.idInstitucion}
        });
        if(!all_Ejecutora){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_Ejecutora);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para actualizar una Institucion
const update_ue = async (req, res) => {
    try {
        const temporally = await db.ue.update({
            name: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Ejecutora actualizada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

//Funcion para deshabilitar una Institucion

const disable_ue = async (req, res) => {
    try {
        const temporally = await db.ue.update({
            isDelete : true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Ejecutora eliminada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    new_ue,
    get_ue,
    get_all_ue,
    update_ue,
    disable_ue
  }