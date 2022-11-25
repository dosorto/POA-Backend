const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

//Controlador para crear un nuevo PEI
const new_PEI = async (req, res) => {
    try {
        //db.sequelize.authenticate();
        await db.pei.create({
            name: req.body.name,
            initialYear: req.body.initialYear,
            finalYear: req.body.finalYear
        });
        return res.status(200).json({ status: "Ok" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(400).json({ status: "error", error: error });
    }
}
//Actualizar PEI
const updatePEI = async (req, res) => {
    try {

        const PEI = await db.PEI.findByPk(req.body.id);
        if (!PEI) {
            return res.status(404).send({ message: 'PEI not found' })
        }
        await db.PEI.update({ name: req.body.name, initialYear: req.body.initialYear, finalYear: req.body.finalYear }, { where: { id: req.body.id } })
        return res.status(200).send(user);

    } catch (error) {
        res.status(500).json({
            message: 'error al actualizar ' + error
        })
    }
}


//Eliminar PEI

const disable_PEI = async (req, res) => {
    try {
        const temporally = await db.PEI.update({
            isDelete: true
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


const get_PEI = async (req,res) =>{
    try{
        const all_pei = await db.pei.findAll({
            where: { isDelete: false },
            include: [{
                model: db.institucion,
            }]
        });
        if (!all_pei) {
            return res.status(404).send({ message: 'no hay ningun elemento' });
        }
        return res.status(200).json(all_pei);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
}
}

module.exports = {
    updatePEI,
    get_PEI,
    new_PEI,
    disable_PEI,
    
}
