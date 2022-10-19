const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const roles_permiso = db.roles_permiso;

const creaRolPermiso = async (req = request, res) => {
    const lista = req.body.lista;
    console.log(req.body.lista);
    try {
        const role = await roles_permiso.bulkCreate(lista);
        return res.status(200).json({
            message: "Rol_Permiso creado con exito",
            data: role,
            
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Ocurrio un error en el backend" + error
        });
    }
}

module.exports = {
    creaRolPermiso
  }