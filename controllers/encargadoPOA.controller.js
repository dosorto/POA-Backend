const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const encargadoPOA = db.encargadoPOA;

const creaEncargadoPOA = async (req = request, res) => {
    const lista = req.body.lista;
    console.log(req.body.lista);
    try {
        const EPOA = await encargadoPOA.bulkCreate(lista);
        return res.status(200).json({
            message: "Empleado_Departamento creado con exito",
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
    creaEncargadoPOA
  }