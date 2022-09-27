const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
      
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      
  
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Warning! Invalid Password!",
        });
      }
     // jwt no incluido todavia
     
      const token = jwt.sign({
        idUsuario: user.id,
        idEmpleado:user.empleado.id,
      }, 
      
      config.secret, {
        expiresIn: 86400, // 24 horas de ducración de tokens
      });
      
      const resp = {
        id: user.id,
        usuario: user.username,
        empleado: user.empleado,
        rol: user.role,//,
        //sesion:ses,
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

// controlador para obtener todos los usuarios
const allUser = async (req, res) => {
  try {
    const allusers = await db.user.findAll({
      where: {
        isDelete: false,
      }
    })
    return res.status(200).send({ allusers });
  } catch (error) {
    res.status(400).json({
      message: 'error al ingresar' + error
    })
  }
};


//conrtolador para cambiar la contraseña
const changePassword = async (req, res) => {
  try {
    // obtener el usuario con el indice proporcionado
    const user = await db.user.findByPk(req.body.id);
    // validar que exista
    if (!user) { return res.status(404).send({ message: "Usuario no encontrado" }) }

    // validar que la contrase;a anterior sea correcta
    if (!bcrypt.compareSync(req.body.old_password, user.password)) {
      return res.status(401).send({ message: "Contraseña equivocada" })
    }
    // varificar que la nueva contrase;a se haya confirmado
    if (!(req.body.new_password === req.body.new_password_again)) {
      return res.status(400).send({ message: "No coiciden ambos campos para nueva contraseña" })
    }

    // actualizar contraseña
    db.user.update(
      { password: bcrypt.hashSync(req.body.new_password, 8) },
      {
        where: {
          id: user.id
        }
      }
    )

    
    return res.status(200).send({ usuario: user.username, isuser: user.id });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  allUser,
  //newUser,
  login,
  changePassword
}

