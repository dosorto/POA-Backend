const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");
const { dimension } = require("../models/");
// const { dimension } = require("../models/");

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
    res.status(200).json( allObjetivo );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

  const AllObjetivo_by_idDimension = async(req,res) => { 
    try{ 
      const allObjetivo =  await db.objetivos.findAll({
      where: {
          isDelete: false,
          idDimension: req.params.idDimension
      },
      include:[{
        model: db.pei,
      },{
         model: db.dimension
      }]
    })
    res.status(200).json( allObjetivo );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

  const AllObjetivo_by_id = async(req,res) => { 
    try{ 
      const allObjetivo =  await db.objetivos.findOne({
      where: {
          isDelete: false,
          id: req.params.id
      },
      include:[{
        model: db.pei,
      },{
         model: db.dimension
      }]
    })
    res.status(200).json( allObjetivo );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };




  const newObjetivo = async (req, res) => {
    try{
      const resultado = await db.objetivos.findOne({where:{nombre:req.body.nombre}})
        if(resultado){
            return res.status(400).json({message:'Nombre de resultado ya existente'});
        }
        const dimension = await db.dimension.findOne({where:{id:req.body.idDimension}})
        if(!objetivo){
            return res.status(404).json({message:'Dimension incorrecto'});
        }
    await db.objetivos.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        idDimension: req.body.idDimension,
        idPei: dimension.idPei
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

const updateObjetivo = async(req, res) =>{
  try {
    if(!req.body.nombre){
        return res.status(400).json({message:'Debe enviar todos los datos'});
    }
    const dimension = await db.dimension.findByPk(req.body.idDimension);
  if (!dimension){ 
    res.status(404).send({message:'no se encontro la dimensión'});
  }
    const updateObjetivo = await db.objetivos.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        idDimension : dimension.id,
        idPei : dimension.idPei
    }, {
        where: {
            id: req.body.id
        }
    });
    if (updateObjetivo) {
        res.status(200).send({
            message: "Objetivo actualizado con éxito",
            resultado : updateObjetivo
        });
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({status:"Server Error: " + error});
}
};

module.exports = {
  AllObjetivo,
  eliminarObjetivo,
  newObjetivo,
  updateObjetivo,
  AllObjetivo_by_idDimension,
  AllObjetivo_by_id
}