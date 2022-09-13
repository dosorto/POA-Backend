const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          usuario: req.body.username,
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
  
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Warning! Invalid Password!",
        });
      }
     
      const token = jwt.sign({
        idUsuario: user.id,
        idEmpleado:user.empleado.id,
      }, 
      
      config.secret, {
        expiresIn: 86400, // 24 horas de ducración de tokens
      });
      const resp = {
        id: user.id,
        usuario: user.usuario,
        empleado: user.empleado,
        rol: user.role,
        sesion:ses,
        token: token
      }
      return res.status(200).send(resp);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: error.message
      });
    }
  };


