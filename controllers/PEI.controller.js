const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { institucion } = require("../models/");

//Controlador para crear un nuevo PEI
const new_PEI = async (req, res) => {
    try {
        const insti = await db.institucion.findOne({ where: { id: req.body.idInstitucion } })
        if (!insti) {
            return res.status(400).json({ message: 'Pei incorrecto' });
        }
        await db.pei.create({
            name: req.body.name,
            initialYear: req.body.initialYear,
            finalYear: req.body.finalYear,
            idInstitucion: insti.id
        });
        return res.status(200).json({ status: "Ok" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ status: "error", error: error });
    }
}

//Actualizar PEI
const updatePEI = async (req, res) => {
    try {
        const PEI = await db.pei.findByPk(req.body.id);
        if (!PEI) {
            return res.status(404).send({ message: 'PEI not found' })
        }
        await db.pei.update({ name: req.body.name, initialYear: req.body.initialYear, finalYear: req.body.finalYear, idInstitucion: req.body.idInstitucion }, { where: { id: req.body.id } })
        return res.status(200).send({message:"ok"});
    } catch (error) {
        res.status(500).json({
            message: 'error al actualizar ' + error
        })
    }
}

//Deshabilitar PEI

const disable_PEI = async (req, res) => {
    try {
        const temporally = await db.pei.update({
            isDelete: true
        }, {
            where: {
                id: req.body.id
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

//Controlador para obtener todos los PEI
/*const get_PEI = async (req, res) => {
    try {
        const get_pei = await db.PEI.findAll({
            where: {
                isDelete: false,
            }
        })
        return res.status(200).send({ get_pei });
    } catch (error) {
        res.status(400).json({
            message: 'error al obtener' + error
        })
    }
}*/
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
const get_all_pei_by_idInstitucion = async (req,res) =>{
    try{
        const all_peis = await db.pei.findAll(
           { where:{isDelete:false,
                    idInstitucion: req.params.idInstitucion},
            include:db.institucion}
        );
        if(!all_peis){
            return res.status(404).send({message:'No hay ningún elemento'});
        }
        return res.status(200).json(all_peis);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

const get_pei = async (req,res) =>{
    try{
        const pei = await db.pei.findOne({where:{id:req.params.id}})
        if(!pei){
            return res.status(404).json({message:'No se encuentra esa dimension'});
        }
        return res.status(200).json({status:"Ok",pei});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    updatePEI,
    get_PEI,
    new_PEI,
    disable_PEI,
    get_all_pei_by_idInstitucion,
    get_pei
}

