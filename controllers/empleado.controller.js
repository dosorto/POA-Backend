const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { empleado } = require("../models/");
const empleadoModel = require("../models/empleado.model");

const new_empleado = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        db.empleado.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono : req.body.telefono,
            fechaNacimiento : req.body.fecha_nacimiento,
            sexo: req.body.sexo
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_empleado_by_id = async (req,res) =>{
    try{
        const empleado = await db.empleado.findByPk(req.params.id);
        if(!empleado){
            return res.status(400).send("<h1>No existe el usuario</h1>");
        }
        return res.status(200).json({empleado});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}
const get_empleados = async (req,res) =>{
    try{
        const empleados = await db.empleado.findAll();
        if(!empleados){
            return res.status(400).send("<h1>No existe ni un empleado</h1>");
        }
        return res.status(200).json({empleados});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}
/*
const eliminarEmpleado = async(req, res) =>{
    try {
      let empleados = await empleadoModel.findById(req.params.id);
      if(!empleados){
        return res.status(404).send({msg: "El empleado no existe"});
    }
    await empleadoModel.findOneAndRemove({id: req.params.id})
    res.json({msg: "empleado eliminado con exito"});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'+ error); 
        
    }
}
*/


const eliminarEmpleados = async (req, res) => {
    try {
        const eliminarEmpleados = await db.empleado.update({
            isDelete : true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (eliminarEmpleados) {
            res.status(200).send({
                message: "Empleado eliminado correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error al eliminar Objetivo: " + error.message
        });
    }
}

module.exports = {
    new_empleado,
    get_empleado_by_id,
    get_empleados,
    eliminarEmpleados
  }