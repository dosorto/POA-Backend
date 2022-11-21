const db = require("../models");

//Funcion para crear una nueva Institucion
const new_departamento = async (req,res) =>{
    try{
        const Departamento = await db.depto.findOne({where:{name:req.body.name}})
        if(Departamento){
            return res.status(400).json({message:'Nombre de departamento ya utilizado'});
        }
        await db.depto.create({
            name: req.body.name,
            descripcion: req.body.descripcion
        });
        return res.status(200).json({status:"Ok"});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para obtener una unica departamento
const get_departamento = async (req,res) =>{
    try{
        const Departamento = await db.depto.findByPk(req.params.id)
        if(!Departamento){
            return res.status(404).json({message:'No se encuentra ese departamento'});
        }
        return res.status(200).json({status:"Ok",Departamento});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}
//Funcion para obtener todas las departamento
const get_all_departamento = async (req,res) =>{
    try{
        const all_Departamento = await db.depto.findAll({
            where:{isDelete:false}
        });
        if(!all_Departamento){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_Departamento);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

// Funcion para actualizar un departamento
const update_departamento = async (req, res) => {
    try {
        const temporally = await db.depto.update({
            name: req.body.name,
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

const disable_departamento = async (req, res) => {
    try {
        const temporally = await db.depto.update({
            isDelete : true
        }, {
            where: {
                name: req.body.name
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "Departamento eliminado con exito"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    new_departamento,
    get_all_departamento,
    disable_departamento,
    update_departamento,
    get_departamento
  }