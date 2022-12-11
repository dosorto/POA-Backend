const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { seguimiento } = require("./indicadoresPoa.controller");
const seguimiento = db.seguimiento;

const ingresaSeguimiento= async (req = request, res) => {
    const lista = req.body.lista;
    console.log(req.body.lista);
    try {
        const seguimiento = await seguimiento.bulkCreate(lista);
        return res.status(200).json({
            message: "Encargado de POA creado con exito",
            data: EPOA,
            
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error en el backend" + error
        });
    }
}


module.exports = {
    ingresaSeguimiento
  }