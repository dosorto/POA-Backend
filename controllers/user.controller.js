const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")


// controlador para el inicio de sesion
const login = async (req, res) => {
  //return res.status(200);
  try {
    // obtener usuario de la bd
    const user = await User.findOne({
      where: {
        username: req.body.username,
        isDelete: false
      },
      include: [{
        model: db.role,
      }, {
        model: db.empleado, include:[{
            model:db.ue, include:[{
                model:db.institucion
              }]
          }]
      }]
    });

    // 404 si no hay usuario con el id proporcionado
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }
     
    // bloque de codigo para obtener la lista de permisos
    const id_permisos = await db.roles_permiso.findAll({
      where: {
        idRol: user.role.id
      }
    })
    const permisos = []
    for (let i = 0; i < id_permisos.length; i++) {
      const permiso_individual = await db.permiso.findOne({ where: { id: id_permisos[i].idPermiso } });
      permisos.push(permiso_individual.Permiso);
    }
    // bloque de codigo para obtener la lista de departamentos
    const id_deptos = await db.empleado_depto.findAll({
      where: {
        idEmpleado: user.empleado.id
      }
    })
    const deptos = []
    for (let i = 0; i < id_deptos.length; i++) {
      deptos.push(await db.depto.findOne({ where: { id: id_deptos[i].idDepto } }));
      
    }
    
    // validar contrase;a
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    
    // error al no coincidir contrase;a
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Warning! Invalid Password!",
      });
    }
    // jwt no incluido todavia
    const token = jwt.sign({
      idUsuario: user.id,
      idEmpleado: user.empleado.id,
      idUE: user.empleado.idUnidadEjecutora
    },

      config.secret, {
      expiresIn: 86400, // 24 horas de ducración de tokens
    });

    const resp = {
      id: user.id,
      usuario: user.username,
      empleado: user.empleado,
      rol: user.role,//,
      permisos:permisos,
      departamentos:deptos,
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
      email : req.body.email,
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

// Controlador para la validacion de username
const userValidation = async (req, res) => {
  try {

    const user = await db.user.findOne({
      where: {
        username: req.body.username
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "usuario no existe"
      });
    }

    return res.status(200).send({ user });

  } catch (error) {
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
      },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: db.role,
      }, {
        model: db.empleado, include: [{ model: db.ue, include:[{
          model:db.institucion
        }] }]
      }]
    })
    return res.status(200).send( allusers );
  } catch (error) {
    res.status(400).json({
      message: 'error al ingresar' + error
    })
  }
};

const get_rol_by_username = async (req, res) => {
  try {
    const rol = await db.role.findOne({
      attributes: ['rol'],
      include: {
        model: db.user,
        attributes: [],
        where: {
          username: req.body.username
        },
      },

    });
    if (!rol) {
      return res.status(404).send({
        message: "El usuario no existe"
      })

    } else {
      return res.status(200).json({ rol })
    }
  } catch (error) {
    console.log("error: " + error);
    return res.status(400).json({ status: "error", error: error });
  }
}

// Funcion para actualizar una dimension
const update_user = async (req, res) => {
  try {
      
      const user = await db.user.findByPk(req.body.id)
      if(!user){
          return res.status(404).json({message:'Error al encontrar el usuario'});
      }
      const temporally = await db.user.update({
        email: req.body.email,
        username: req.body.username,
        idEmpleado: req.body.idEmpleado,
        idRol: req.body.idRol
      }, {
          where: {
              id: req.body.id
          }
      });
      if (temporally) {
          res.status(200).send({
              message: "Usuario actualizado con exito",
              user : temporally
          });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({status:"Server Error: " + error});
  }
}

// Controlador para obetener usuario por medio de un id
const getUserById = async (req, res) => {
  try {
    const usuario = await db.user.findByPk(req.params.id, {
      where: {
        isDelete: false,
      },
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: db.role,
      }, {
        model: db.empleado, include: [{ model: db.institucion }]
      }]
    });
    if (!usuario) {
      return res.status(404).send({ message: 'usuario no encontrado' });

    } else {
      return res.status(200).send({ usuario });
    }

  } catch (error) {

    console.log("error" + error);
    return res.status(500).send({ status: "Internal Server Error", error: error });
  }
};

const deleteUser = async (req,res)=>{
  try{
  // const user = db.user.findByPk({
  //   where: {
  //     id : req.params.id
  //   }
  // })

  // if(!user){
  //   return res.status(404).send({
  //     message: "usuario no existe"
  //   });
  // }
  // if(user.isDelete){
  //   return res.status(400).send({
  //     message: "usuario ya ha sido eliminado"
  //   });
  // }
  console.log("ANTES--------------------");
  await db.user.update({
    isDelete: true
  }, {
    where: {
      id: req.params.id
    }
  
  
});
console.log("despues--------------------");
return res.status(200).send({
  message: "usuario eliminado con éxito"
});
  }catch(error){
    return res.status(500).send({
      message: "Error de servidor: " + error
    });
  }


}

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
      iduser: user.id,
      email:user.email
    }
    verificationLink = token;

    db.user.update(
      { resetToken: token },
      { where: { id: user.id } })

   // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'admistrar.poa.curlp@gmail.com', // generated gmail user
      pass: 'wphgvdcltjsnckir', // generated gmail password
    },
  });
  transporter.verify().then(()=>{
    console.log('ready for send emails')
    console.log(db.user.email)
  })

  const mailoption = {
    from: 'admistrar.poa.curlp@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Recupera tu contraseña ✔", // Subject line
    html: `
    <b>ESTE ES TU CODIGO DE VERIFICACION DE ACCESO--->    </b>
    <a href="${verificationLink}">${verificationLink}</a>`

  }

  transporter.sendMail(mailoption,(err,result)=>{
    if(err){
      console.log(err)
      res.json('vaya algo salio mal')
    }else{res.json('gracias por mandar el email')}
  })

} catch (error) {
  return res.status(50).send(error);
}  //TODO: sendemail

  return res.json({ message, info: emailStatus,  })

};



//controlaor para nueva contraseña



const newPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { newPasswordAgain } = req.body;
  const {resetToken} = req.body;
  if (!(newPassword === newPasswordAgain)) {
    return res.status(400).send({ message: "No coiciden ambos campos para nueva contraseña" })
  }else
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
      { password:bcrypt.hashSync( req.body.newPassword, 8 ) },
    { where: {id: user.id } })
    //  return res.status(200).send({ usuario: user.username, iduser: user.id });
  
  } catch (error) {
    return res.status(400).json({ message: 'algo salio mal de nuevo'+error });
  }
  res.json({ message: 'password cambiada correctamente' })
  };

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
  login,
  newUser,
  userValidation,
  get_rol_by_username,
  getUserById,
  update_user,
  forgotPassword,
  newPassword,
  changePassword,
  deleteUser
}
