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

  module.exports = {
    allObjetivo
  }
