const db = require("../models");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

// controlador para crear una nueva actividad



const newActividad = async (req, res) => {
    try {
        const actividad = await db.actividad.findOne({ where: { nombre: req.body.nombre } })
        if (actividad) {
            return res.status(400).json({ message: 'Nombre de actualizado ya utilizado' });
        }
        const objetivo = await db.objetivos.findOne({ where: { id: req.body.idObjetivos } })
        if (!objetivo) {
            return res.status(404).json({ message: 'Objetivo incorrecto' });
        }

        await db.actividad.create({
            nombre: "actividad1",
            descripcion: "des",
            resultadoUnidad: "1",
            estado: "reprobrado",
            tipoActividad: "1",
            Categoria: "1",

        });
        return res.status(200).json({ status: "Ok" });
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
};
