const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const empleado_depto = db.empleado_depto;

const creaEmpleadoDepto = async (req = request, res) => {
    const lista = req.body.lista;
    console.log(req.body.lista);
    try {
        const Edepto = await empleado_depto.bulkCreate(lista);
        return res.status(200).json({
            message: "Empleado_Departamento creado con exito",
            data: Edepto,
            
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error en el backend" + error
        });
    }
}

module.exports = {
    creaEmpleadoDepto
  }