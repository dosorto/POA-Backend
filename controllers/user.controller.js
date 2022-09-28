const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");

  // Controlador para obetener usuario por medio de un id
  const getUserById = async (req,res) =>{
    try{
        const usuario = await db.user.findByPk(req.params.id,{
          include:[{
            model: db.role,
          },{
             model: db.empleado
          }]
        });
        if(!usuario){
              res.status(404).send({
              message:'usuario no encontrado'
            });
        }else{
          return res.status(200).json({usuario});
        }
        
    }catch(error){
      console.log("error" + error);
        return res.status(500).json({status:"Internal Server Error", error:error});
    }
};


  module.exports = {
    getUserById
  }

