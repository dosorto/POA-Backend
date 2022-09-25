const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

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

const get_PEI = async (req,res) =>{
    try{
        const PEI = await db.PEI.findAll();
        if(!PEI){
            return res.status(400).send("<h1>No existe ningún PEI creado</h1>");
        }
        return res.status(200).json({PEI});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}


module.exports = {
    new_empleado,
    get_empleado_by_id,
    get_PEI
  }