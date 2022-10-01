const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

const updatePEI = async(req, res) => {
    try {

      const PEI = await db.PEI.findByPk(req.body.id);
      if(!PEI){
        return res.status(404).send({message:'PEI not found'})
      }
      await db.PEI.update({name:req.body.name, initialYear: req.body.initialYear, finalYear: req.body.finalYear},{where:{id:req.body.id}})
      return res.status(200).send(user);

    } catch(error){
      res.status(500).json({
        message:'error al ingresar ' + error
      })
    }
  }

//Controlador para crear un nuevo PEI
const new_PEI = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        db.PEI.create({
            name: req.body.name,
            initialYear: req.body.initialYear,
            finalYear: req.body.finalYear
        });
        return res.status(200).json({status:"Ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}
//Controlador para obtener todos los PEI
const get_PEI = async (req,res) =>{
    try{
        const PEI = await db.PEI.findAll();
        if(!PEI){
            return res.status(400).send("<h1>No existe ningún PEI creado</h1>");
        }
        return res.status(200).json({PEI});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}


module.exports = {
    updatePEI,
    get_PEI,
    new_PEI
}

//Eliminar PEI
/*
const get_PEI = async(req,res) => { 
    try{ 
      const  get_pei =  await db.PEI.findAll({
      where: {
          isDelete: false,
      }})
      return res.status(200).send({get_pei });
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };



//Eliminar PEI

const disable_PEI = async (req, res) => {
    try {
        const temporally = await db.PEI.update({
            isDelete : true
        }, {
            where: {
                name: req.body.name
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "PEI is disable"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error: PEI can't be disable " + error.message
        });
    }
}

module.exports = {
    new_PEI,
    get_PEI,
    disable_PEI
  }*/
