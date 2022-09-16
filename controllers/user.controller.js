const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");

// controlador para el inicio de sesion
const login = async (req, res) => {
    //return res.status(200);
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
          isDelete: false
        },
        include: [{
          model: db.role,
        }, {
          model: db.empleado,
        }]
      });
  
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }
      // desabilitado temporalmente
      /*
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      */
      const passwordIsValid = user.password === req.body.password;
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Warning! Invalid Password!",
        });
      }
     // jwt no incluido todavia
     /*
      const token = jwt.sign({
        idUsuario: user.id,
        idEmpleado:user.empleado.id,
      }, 
      
      config.secret, {
        expiresIn: 86400, // 24 horas de ducración de tokens
      });
      */
      const resp = {
        id: user.id,
        usuario: user.username,
        empleado: user.empleado,
        rol: user.role//,
        //sesion:ses,
        //token: token
      }
      return res.status(200).send(resp);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message
      });
    }

  };

// controlador para crear un usuario
  const newUser = async(req,res) => { 
    try{
      db.user.create({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 8),
        idEmpleado: req.body.idEmpleado,
        idRol : req.body.idRol
        })
        res.status(200).json({
          message:'usuario creado con exito'
        })
        
      } catch (error){
        res.status(400).json({
          message:'error al ingresar' + error
        })
      }
     };

// controlador para obtener todos los usuarios
  const allUser = async(req,res) => { 
    try{ 
      const  allusers =  await db.user.findAll({
      where: {
          isDelete: false,
      }})
      return res.status(200).send({ allusers });
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };
  
  module.exports = {
    allUser,
    newUser,
    login
  }

