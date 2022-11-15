const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model, and, or } = require("sequelize");
// const objetivo = db.objetivos;
const bcrypt = require("bcryptjs");
const { dimension } = require("../models/");
const { disable_dimension } = require("./dimension.controller");
const { UpdateDateColumn } = require("typeorm");
// const { dimension } = require("../models/");

/// Listo
const AllTareas = async(req,res) => { 
    try{ 
      const AllTareas =  await db.tarea.findAll({
      where: {
          isDelete: false,
      },include: [{
        model: db.actividad,
      }]
    })
    res.status(200).json( AllTareas );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };
// Segundo listo
  const AllTareas_by_id = async(req,res) => { 
    try{ 
      const allTareas =  await db.tarea.findOne({
      where: {
          isDelete: false,
          id: req.params.id
      },include: [{
        model: db.actividad,
      }]
    })
    res.status(200).json( allTareas );
  } catch(error){
      res.status(400).json({
        message:'error al mostrar' + error
      })
  }
  };

// Tercero Listo
  const newTarea = async (req,res) =>{
    try{
        const actividad = await db.actividad.findByPk(req.body.idActividad);
        if (!actividad){ 
          res.status(404).send({message:'no se encontro la actividad'});
        }
        db.tarea.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            isPresupuesto: req.body.isPresupuesto,
            idActividad: actividad.id
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
} 

const eliminarTarea = async (req, res) => {
  try {
    const updateTarea = await db.tarea.update({
        isDelete: true
  },{
    where: {
      id: req.params.id
    }
  });
  if (updateTarea){
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

const updateTarea = async(req, res) =>{
  try {
    const actividad = await db.actividad.findByPk(req.body.idActividad);
    if (!actividad){ 
      res.status(404).send({message:'no se encontro la actividad'});
    }
    if(!req.body.nombre){
        return res.status(400).json({message:'Debe enviar todos los datos'});
    }
    const updateTarea = await db.tarea.update({
        nombre: req.body.nombre,
        descripcion:req.body.descripcion,
        isPresupuesto:req.body.isPresupuesto,
        idActividad: actividad.id
    }, {
        where: {
            id: req.body.id
        }
    });
    if (updateTarea) {
        res.status(200).send({
            message: "Objetivo actualizado con éxito",
            resultado : updateTarea
        });
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({status:"Server Error: " + error});
}
};

const probando_like = async(req,res) => { 
  try{ 
    const tarea = await db.tarea.findOne({
      where: {
        isPresupuesto: true,
        nombre: {
          [Op.substring]: req.body.nombre,
        }
    },
      include:[{model:db.presupuesto, include:[{model:db.grupogasto},{model: db.objetogasto}]},]
    });
  res.status(200).json( tarea );
} catch(error){
    res.status(400).json({
      message:'error al mostrar' + error
    })
}
};

const AllTarea_by_idActividad = async(req,res) => { 
  try{ 
    const allTarea =  await db.tarea.findAll({
    where: {
        isDelete: false,
        idActividad: req.params.idActividad
    },
    include:[{
      model: db.actividad,
    }]
  })
  res.status(200).json( allTarea );
} catch(error){
    res.status(400).json({
      message:'error al ingresar' + error
    })
}
};


module.exports = {
  AllTareas,
  AllTareas_by_id,
  updateTarea,
  eliminarTarea,
  newTarea,
  probando_like,
  AllTarea_by_idActividad
}