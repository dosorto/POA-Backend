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
const AllTareasH = async(req,res) => { 
    try{ 
      const AllTareasH =  await db.tareas_historico.findAll({
      where: {
          isDelete: false,
          
      },order: [
        // will return `name`
        ['nombre']]
    })
    res.status(200).json( AllTareasH );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

  module.exports = {
    AllTareasH
}