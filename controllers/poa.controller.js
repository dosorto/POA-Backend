const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { departamento, unidadesejec } = require("../models/");

//Controlador para crear un nuevo POA
const new_POA = async (req, res) => {
    try {
        const depart = await db.depto.findOne({ where: { id: req.body.idDepto } })
        if (!depart) {
            return res.status(400).json({ message: 'POA incorrecto' });
        }
        const unidad = await db.ue.findOne({ where: { id: req.body.idUE } })
        if (!unidad) {
            return res.status(400).json({ message: 'POA incorrecto' });
        }
        const insti = await db.institucion.findOne({ where: { id: req.body.idInstitucion } })
        if (!insti) {
            return res.status(400).json({ message: 'POA incorrecto' });
        }
        await db.poa.create({
            name: req.body.name,
            anio: req.body.anio,
            fuente11: req.body.fuente11,
            fuente12: req.body.fuente12,
            fuente12B: req.body.fuente12B,
            idDepto: depart.id,
            idUE: unidad.id,
            idInstitucion: insti.id
        });
        return res.status(200).json({ status: "Ok" });
    } catch (error) {
        console.log("error: " + error);
        return res.status(500).json({ status: "error", error: error });
    }
}

//Actualizar POA
const updatePOA = async (req, res) => {
    try {
        const POA = await db.poa.findByPk(req.body.id);
        if (!POA) {
            return res.status(404).send({ message: 'POA not found' })
        }
        await db.poa.update({ name: req.body.name, anio: req.body.anio, fuente11: req.body.fuente11, fuente12: req.body.fuente12, fuente12B: req.body.fuente12B, idDepto: req.body.idDepto, idUE: req.body.idUE, idInstitucion: req.body.idInstitucion }, { where: { id: req.body.id } })
        return res.status(200).send({ message: "ok" });
    } catch (error) {
        res.status(500).json({
            message: 'error al actualizar ' + error
        })
    }
}

//Deshabilitar POA

const disable_POA = async (req, res) => {
    try {
        const temporally = await db.poa.update({
            isDelete: true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (temporally) {
            res.status(200).send({
                message: "POA is disable"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error: POA can't be disable " + error.message
        });
    }
}

//Obtener todos los POA
const get_POA = async (req, res) => {
    try {
        const all_poa = await db.poa.findAll({
            where: { isDelete: false },
            include: [{
                model: db.depto
            }, { model: db.ue }],
        });
        if (!all_poa) {
            return res.status(404).send({ message: 'no hay ningun elemento' });
        }
        return res.status(200).json(all_poa);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

// Obtener POA por depto
const get_all_poa_by_idDepto = async (req, res) => {
    try {
        const all_poas = await db.poa.findAll(
            {
                where: {
                    isDelete: false,
                    idDepto: req.params.idDepto
                },
                include: db.depto
            }
        );
        if (!all_poas) {
            return res.status(404).send({ message: 'No hay ningún elemento' });
        }
        return res.status(200).json(all_poas);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

// Obetener POA por Unidad Ejecutora
const get_all_poa_by_idUE = async (req, res) => {
    try {
        const all_ues = await db.ue.findAll(
            {
                where: {
                    isDelete: false,
                    idUE: req.params.idUE
                },
                include: db.ue
            }
        );
        if (!all_ues) {
            return res.status(404).send({ message: 'No hay ningún elemento' });
        }
        return res.status(200).json(all_ues);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

//Obtener POA por ID
const get_poa = async (req, res) => {
    try {
        const poa = await db.poa.findOne({ where: { id: req.params.id } })
        if (!poa) {
            return res.status(404).json({ message: 'No se encuentra esa dimension' });
        }
        return res.status(200).json({ status: "Ok", poa });
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

module.exports = {

    new_POA,
    updatePOA,
    get_POA,
    disable_POA,
    get_all_poa_by_idDepto,
    get_all_poa_by_idUE,
    get_poa
}