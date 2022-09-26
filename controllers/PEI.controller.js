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
    get_PEI
  }