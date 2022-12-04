const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

const new_empleado = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        await db.empleado.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono : req.body.telefono,
            fechaNacimiento : req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            idInstitucion: req.body.idInstitucion
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_empleado_by_id = async (req,res) =>{
    try{
        const empleado = await db.empleado.findByPk(req.params.id,{
            where: {
                isDelete: false,
              },
              include: [{
                model: db.institucion,
              }]
        });
        if(!empleado){
            return res.status(400).send("<h1>No existe el usuario</h1>");
        }
        return res.status(200).json(empleado);
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}
const get_empleados = async (req,res) =>{
    try{
        const empleados = await db.empleado.findAll({
            where: {
                isDelete: false,
              },
              include: [{
                model: db.institucion,
              }]
        });
        if(!empleados){
            return res.status(400).send("<h1>No existe ni un empleado</h1>");
        }
        return res.status(200).json(empleados);
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}


module.exports = {
    new_empleado,
    get_empleado_by_id,
    get_empleados
  }