const db = require("../models");

//Funcion para crear una nueva Institucion
const new_depto = async (req,res) =>{
    try{
        const depto = await db.depto.findOne({where:{name:req.body.nombre}})
        if(depto){
            return res.status(400).json({message:'Nombre de Departamento ya utilizado'});
        }
        await db.depto.create({
            name: req.body.nombre,
            descripcion: req.body.descripcion,
            idUnidadEjecutora:req.body.idUnidadEjecutora
        });
        return res.status(200).json({status:"Ok"});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para obtener una unica departamento
const get_all_deptos = async (req,res) =>{
    try{
        const all_deptos = await db.depto.findAll({
            where:{isDelete:false,
                idUnidadEjecutora:req.params.idUnidadEjecutora}
        });
        if(!all_deptos){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_deptos);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}
//Funcion para obtener todas las departamento
const get_depto= async (req,res) =>{
    try{
        const depto = await db.depto.findByPk(req.params.id)
        if(!depto){
            return res.status(404).json({message:'No se encuentra ese Departamento'});
        }
        return res.status(200).json(depto);
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para actualizar un departamento
const update_depto = async (req, res) => {
    try {
        const temporally = await db.depto.update({
            name: req.body.nombre,
            descripcion: req.body.descripcion
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Departamento actualizado con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

//Funcion para deshabilitar una departamento

const disable_depto = async (req, res) => {
    try {
        const temporally = await db.depto.update({
            isDelete : true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Departamento eliminada con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    new_depto,
    get_all_deptos,
    get_depto,
    update_depto,
    disable_depto
}