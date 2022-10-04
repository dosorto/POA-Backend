const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

//Controlador para crear un nuevo PEI
const new_PEI = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        await db.pei.create({
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
        const PEI = await db.pei.findAll();
        if(!PEI){
            return res.status(400).send("<h1>No existe ningún PEI creado</h1>");
        }
        return res.status(200).json({PEI});
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}



//Eliminar PEI

const disable_PEI = async (req, res) => {
    try {
        const temporally = await db.pei.update({
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
  }