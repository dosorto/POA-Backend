const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
// const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");
const { dimension } = require("../models/");
// const { dimension } = require("../models/");

/// Listo
const AllGrupo = async(req,res) => { 
    try{ 
      const allGrupo =  await db.grupogasto.findAll({
      where: {
          isDelete: false,
      }
    })
    res.status(200).json( allGrupo );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };
// Segundo listo
  const AllGrupo_by_id = async(req,res) => { 
    try{ 
      const allGrupo =  await db.grupogasto.findOne({
      where: {
          isDelete: false,
          id: req.params.id
      }
    })
    res.status(200).json( allObjeto );
  } catch(error){
      res.status(400).json({
        message:'error al mostrar' + error
      })
  }
  };

// Tercero Listo
  const newGrupo = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        db.grupogasto.create({
            nombre: req.body.nombre,
            identificador: req.body.identificador
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
} 

const eliminarGrupo = async (req, res) => {
  try {
    const grupoUpdate = await db.grupogasto.update({
        isDelete: true
  },{
    where: {
      id: req.params.id
    }
  });
  if (grupoUpdate){
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

const updateGrupo = async(req, res) =>{
  try {
    if(!req.body.nombre){
        return res.status(400).json({message:'Debe enviar todos los datos'});
    }
    const updateGrupo = await db.grupogasto.update({
        nombre: req.body.nombre,
        identificador: req.body.descripcion,
    }, {
        where: {
            id: req.body.id
        }
    });
    if (updateGrupo) {
        res.status(200).send({
            message: "Objetivo actualizado con éxito",
            resultado : updateGrupo
        });
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({status:"Server Error: " + error});
}
};

module.exports = {
  AllGrupo,
  AllGrupo_by_id,
  updateGrupo,
  eliminarGrupo,
  newGrupo
}