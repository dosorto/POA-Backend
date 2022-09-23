const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

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
       const permiso = await db.permiso.findByPk(req.params.id);
       return res.status(200).json({permiso})
    }catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

module.exports = {
    newPermiso,
    get_permiso_by_id
  }