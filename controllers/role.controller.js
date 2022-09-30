const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

const new_rol = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        db.role.create({
            rol: req.body.rol,
            descripcion: req.body.descripcion,
            idPermiso: req.body.idPermiso // Letty Agregue requerimientos de permiso
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_roles = async (req,res) =>{
    try{
        const roles = await db.role.findAll();
        if(!roles){
            return res.status(400).send("<h1>No existe ni un empleado</h1>");
        }
        return res.status(200).json({roles});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}

const get_rol_by_id = async (req,res) =>{
    try{
       const rol = await db.role.findByPk(req.params.id);
       return res.status(200).json({rol})
    }catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

module.exports = {
    new_rol,
    get_rol_by_id,
    get_roles
  }








