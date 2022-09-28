const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");

const allObjetivo = async(req,res) => { 
    try{ 
      const allObjetivo =  await db.objetivos.findAll({
      where: {
          isDelete: false,
      },
      include:[{
        model: db.pei,
      },{
         model: db.dimension
      }]
    })
      return res.status(200).send({ allObjetivo });
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

   

const eliminarObjetivo = async (req, res) => {
  try {
    const objetivoUpdate = await objetivo.update({
        isDelete: true
  },{
    where: {
      id: req.params.id
    }
  });
  if (objetivoUpdate){
      res.status(200).send({
        message: "Usuario baja en el backend"
    });
  }
} catch (error) {
  console.log(error);
  res.status(401).send({
    message: "Error al elimiar el usuario " + error.message
  });
}

}

module.exports = {
  allObjetivo,
  eliminarObjetivo
}