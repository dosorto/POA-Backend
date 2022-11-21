const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
// const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");
const { dimension } = require("../models/");
const { disable_dimension } = require("./dimension.controller");
const { UpdateDateColumn } = require("typeorm");
// const { dimension } = require("../models/");
/// Listo
const AllUnidadMedida = async(req,res) => { 
    try{ 
      const allUnidadMedida =  await db.unidadmedida.findAll({
      where: {
          isDelete: false,
      }
    })
    res.status(200).json( allUnidadMedida );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };
// Segundo listo
  const AllUnidadmedida_by_id = async(req,res) => { 
    try{ 
      const allUnidadMedida =  await db.unidadmedida.findOne({
      where: {
          isDelete: false,
          id: req.params.id
      }
    })
    res.status(200).json( allUnidadMedida );
  } catch(error){
      res.status(400).json({
        message:'error al mostrar' + error
      })
  }
  };
// Tercero Listo
  const newUnidadMedida = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        db.unidadmedida.create({
            nombre: req.body.nombre
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
} 
const eliminarUnidadMedida = async (req, res) => {
  try {
    const updateUnidadMedida = await db.unidadmedida.update({
        isDelete: true
  },{
    where: {
      id: req.params.id
    }
  });
  if (updateUnidadMedida){
      res.status(200).send({
        message: "medida baja en el backend"
    });
  }
} catch (error) {
  console.log(error);
  res.status(401).send({
    message: "Error al elimiar la medida " + error.message
  });
}
}
const updateUnidadMedida = async(req, res) =>{
  try {
    if(!req.body.nombre){
        return res.status(400).json({message:'Debe enviar todos los datos'});
    }
    const updateUnidadMedida = await db.unidadmedida.update({
        nombre: req.body.nombre,
    }, {
        where: {
            id: req.body.id
        }
    });
    if (updateUnidadMedida) {
        res.status(200).send({
            message: "Unidad actualizada con éxito",
            resultado : updateUnidadMedida
        });
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({status:"Server Error: " + error});
}
};
module.exports = {
  AllUnidadMedida,
  AllUnidadmedida_by_id,
  updateUnidadMedida,
  eliminarUnidadMedida,
  newUnidadMedida
}