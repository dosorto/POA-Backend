const db = require("../models");

//Funcion para crear una nueva Institucion
const new_institucion = async (req,res) =>{
    try{
        const Institucion = await db.institucion.findOne({where:{nombre:req.body.nombre}})
        if(Institucion){
            return res.status(400).json({message:'Nombre de institucion ya utilizado'});
        }
        await db.institucion.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });
        return res.status(200).json({status:"Ok"});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para obtener una unica Institucion
const get_institucion= async (req,res) =>{
    try{
        const Institucion = await db.institucion.findByPk(req.params.id)
        if(!Institucion){
            return res.status(404).json({message:'No se encuentra esa Institucion'});
        }
        return res.status(200).json({status:"Ok",Institucion});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}
//Funcion para obtener todas las Instituciones
const get_all_institucion = async (req,res) =>{
    try{
        const all_Institucion = await db.institucion.findAll({
            where:{isDelete:false}
        });
        if(!all_Institucion){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_Institucion);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

const get_all_institucion_by_idPei = async (req,res) =>{
    try{
        const all_Institucion = await db.institucion.findAll({
            where:{isDelete:false,
            idPei: req.params.idPei}
        });
        if(!all_Institucion){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_Institucion);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para actualizar una Institucion
const update_institucion = async (req, res) => {
    try {
        const temporally = await db.institucion.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Dimension actualizada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

//Funcion para deshabilitar una Institucion

const disable_institucion = async (req, res) => {
    try {
        const temporally = await db.institucion.update({
            isDelete : true
        }, {
            where: {
                nombre: req.body.nombre
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Institucion eliminada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    new_institucion,
    get_all_institucion,
    disable_institucion,
    update_institucion,
    get_institucion,
    get_all_institucion_by_idPei
  }