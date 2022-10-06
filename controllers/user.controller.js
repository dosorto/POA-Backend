const db = require("../models/");
const getRepository = require('typeorm');
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const { user } = require("../models/");
const app = express;
const validate = require('class-validator');
const { jwtSecret } = require("../config/auth.config");

const nodemailer = require("nodemailer");

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
const newUser = async (req, res) => {
  try {
    db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      idEmpleado: req.body.idEmpleado,
      idRol: req.body.idRol
    })
    res.status(200).json({
      message: 'usuario creado con exito'
    })

  } catch (error) {
    res.status(400).json({
      message: 'error al ingresar' + error
    })
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


//controlador para recuperar la contraseña





const forgotPassword = async (req, res) => {
  const message = 'check your email for a loink to reset your password';
  const emailStatus = 'ok';
  try {
    const user = await db.user.findOne({ where: { username: req.body.username, isDelete: false } });
    if (!user) { return res.status(401).send({ message: "User Not found." }); }
    //   res.status(200).json({ message ,usuario: user.username, iduser: user.id });  
    const token = jwt.sign({
      userId: user.id,
      username: user.username
    },
      config.secret,
      { expiresIn: '86400', });

    const resp = {
      userName: user.username,
      resetToken: token,
      iduser: user.id
    }
    verificationLink = `http://localhost:8080/auth/newPassword/${token}`;

    db.user.update(
      { resetToken: token },
      { where: { id: user.id } })
  }
  catch (error) {
    return res.status(500).send(error);
  }
try {
   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'admistrar.poa.curlp@gmail.com', // generated ethereal user
      pass: 'wphgvdcltjsnckir', // generated ethereal password
    },
  });
  transporter.verify().then(()=>{
    console.log('ready for send emails')
  })

  const mailoption = {
    from: 'admistrar.poa.curlp@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Recupera tu contraseña ✔", // Subject line
    html: `
    <b>POR FAVOR HAZ CLICK EN EL SIGUIENTE EN LACE PARA RECUPERAR TU CONTRASEÑA O COPIA EL LINK EN TU NAVEGADOR</b>
    <a href="${verificationLink}">${verificationLink}</a>`

  }

  transporter.sendMail(mailoption,(err,result)=>{
    if(err){
      console.log(err)
      res.json('vaya algo salio mal')
    }else{res.json('gracias por mandar el email')}
  })

} catch (error) {
  return res.status(500).send(error);
}  //TODO: sendemail

  return res.json({ message, info: emailStatus, test: verificationLink })

};



//controlaor para nueva contraseña



const newPassword = async (req, res) => {
  const { newPassword } = req.body;
  const resetToken = req.headers.reset;

  if (!(resetToken && newPassword)) {
    return res.status(400).json({ message: 'todos los campos son requeridos' });
  }// else{return res.status(400).json({resetToken:resetToken, newPassword:newPassword}); }
  let jwtPayload;
  try {
    // jwtPayload = jwt.verify(db.user.resetToken, config.secret);
    const user = await db.user.findOne({ where: { resetToken } });
    if (!user) { return res.status(404).send({ message: "Usuario no encontrado" }); }
   // return res.status(200).send({ usuario: user.username, iduser: user.id });
    
   db.user.update(
      { password: req.body.newPassword },
    { where: {id: user.id } })
    //  return res.status(200).send({ usuario: user.username, iduser: user.id });
  
  } catch (error) {
    return res.status(400).json({ message: 'algo salio mal de nuevo' });
  }

 // const validationOps = { validationError: { target: false, value: false } };
  //const errors = await validate(user, validationOps);

//  if (errors.lenght > 0) {
  //  return res.status(401).json({ message: 'algo fue mal en el cambio de contrase;a1' });
  //}
  res.json({ message: 'password cambiada correctamente' })
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
}
module.exports = {
  allUser,
  newUser,
  login,
  changePassword,
  newPassword,
  forgotPassword
}

