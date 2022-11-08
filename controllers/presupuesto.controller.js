const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { tarea } = require("../models/");

/// por nombre esta ahorita
const presupuesto_by_idTarea = async(req,res) => { 
    try{ 
      const onepresupuesto =  await db.presupuesto.findAll({
      
      include:[{
        model: db.tarea,
        where: {
            isDelete: false,
            nombre: req.params.nombre
        },
      }]
    })
    res.status(200).json( onepresupuesto );
  } catch(error){
      res.status(400).json({
        message:'error al mostrar' + error
      })
  }
  };

  const probando_like = async(req,res) => { 
    try{ 
      const onepresupuesto =  await db.presupuesto.findOne({
       
      include:[{
        model: db.tarea,
        isDelete: false,
            name: {
                substring: req.body.nombre
              }
    },{
        model: db.objetogasto,
        // where: {
        //     isDelete: false,
        //     name: {
        //         like: '%'+req.body.tarea.nombre+'%'
        //       }
        // },
        }]
    })
    res.status(200).json( onepresupuesto );
  } catch(error){
      res.status(400).json({
        message:'error al mostrar' + error
      })
  }
  };


  module.exports = {
   presupuesto_by_idTarea,
   probando_like
  }