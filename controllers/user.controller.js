const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");


// controlador para crear un usuario
  const newUser = async(req,res) => { 
    try{
      const user = await db.user.findOne({where:{username:req.body.username}});
      if (user){
        return res.status(400).send({message:'El usuario ya existe'});
      }
      const verifyPassword = req.body.password === req.body.password2;
      if(!verifyPassword){
        return res.status(400).send({message:'Las contraseñas no coinciden'});
      }
      await db.user.create({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 8),
        idEmpleado: req.body.idEmpleado,
        idRol : req.body.idRol
        })
        res.status(200).json({
          status:'ok'
          
        })
        
      } catch (error){
        res.status(400).json({
          message:'error al ingresar' + error
        })
      }
     };


  module.exports = {
    newUser
  }

