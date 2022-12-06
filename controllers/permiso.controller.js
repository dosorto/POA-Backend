const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
///const {  user,  roles_permiso, role } = require("../models/");

const newPermiso = async (req,res) =>{
    try{
        db.permiso.create({
            Permiso: req.body.Permiso,
            Descripcion: req.body.Descripcion,
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_permiso_by_id = async (req,res) =>{
    try{
        const user = await db.user.findOne({
            where: {
              IsDelete: false,
              id: req.body.id
            }, include: [{
              model: db.role,
              include:[
                {
                    model: db.permiso,
                }
              ]
            },{model: db.empleado },]
          });
        return res.status(200).json({user})
    }catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_allPermisos = async (req,res) =>{
    try{
        const permiso = await db.permiso.findAll();
        if(!permiso){
            return res.status(400).send("<h1>No existen permisos</h1>");
        }
        return res.status(200).json(permiso);
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}

module.exports = {
    newPermiso,
    get_permiso_by_id,
    get_allPermisos
  }