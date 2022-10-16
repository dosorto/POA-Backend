const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");

const AllObjetivo = async(req,res) => { 
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
      return res.status(200).send(allObjetivo);
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

  const newObjetivo = async (req, res) => {
    try {
      db.objetivos.create({
        nombre: req.body.nombre,
        idDimension: req.body.idDimension,
        idPei: req.body.idPei
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

const updateObjetivo = async (req, res) => {
  try {
      const objetivo = await db.objetivos.findByPk(req.body.id);
      if (!objetivo) {
          return res.status(404).send({ message: 'PEI not found' })
      }
      await db.objetivos.update({ nombre: req.body.nombre, idDimension: req.body.idDimension, idPei: req.body.idPei }, { where: { id: req.body.id } })
      return res.status(200).send(objetivo);

  } catch (error) {
      res.status(500).json({
          message: 'error al actualizar ' + error
      })
  }
}

module.exports = {
  AllObjetivo,
  eliminarObjetivo,
  newObjetivo,
  updateObjetivo
}