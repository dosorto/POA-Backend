const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

/// Listo
const AllFuentePoa = async (req, res) => {
    try {
        const allFuentePoa = await db.fuentePoa.findAll({
            where: {
                isDelete: false,
            }
        })
        res.status(200).json(allFuentePoa);
    } catch (error) {
        res.status(400).json({
            message: 'error al ingresar' + error
        })
    }
};
// Segundo listo
const AllFuentePoa_by_id = async (req, res) => {
    try {
        const allfuentePoa = await db.fuentePoa.findOne({
            where: {
                isDelete: false,
                id: req.params.id,
            }
        })
        res.status(200).json(allfuentePoa);
    } catch (error) {
        res.status(400).json({
            message: 'error al mostrar' + error
        })
    }
};

// Tercero Listo
const newFuentePoa = async (req, res) => {
    try {
        db.fuentePoa.create({
            cantidad: req.body.cantidad
        });
        return res.status(200).json({ status: "ok" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(400).json({ status: "error", error: error });
    }
}

const eliminarFuentePoa = async (req, res) => {
    try {
        const fuenteUpdate = await db.fuente.update({
            isDelete: true
        }, {
            where: {
                id: req.params.id
            }
        });
        if (fuenteUpdate) {
            res.status(200).send({
                message: "Usuario baja en el backend"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error al elimiar el usuario " + error.message
        });
    }

}

const updateFuentePoa = async (req, res) => {
    try {
        if (!req.body.cantidad) {
            return res.status(400).json({ message: 'Debe enviar todos los datos' });
        }
        const updateFuente = await db.fuentePoa.update({
            cantidad: req.body.cantidad
        }, {
            where: {
                id: req.body.id
            }
        });
        if (updateFuente) {
            res.status(200).send({
                message: "Objetivo actualizado con éxito",
                resultado: updateFuente
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Server Error: " + error });
    }
};

module.exports = {
    AllFuentePoa,
    AllFuentePoa_by_id,
    updateFuentePoa,
    eliminarFuentePoa,
    newFuentePoa
}