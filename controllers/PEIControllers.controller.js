



const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");

// controlador para crear una nueva area


const newArea = async (req, res) => {
    try {
        db.areas.create({
            nombre: req.body.nombre,
            idObjetivo: req.body.idObjetivo,
            idDimension: req.body.idDimension,
            idPEI: req.body.idPEI
        });
        res.status(200).json({
            message: 'Area creada con exito'
        })
    } catch (error) {
        res.status(400).json({
            message: 'error al crear esta Area' + error
        })
    }
};

//controlador para borrar un area del pei

const delete_area = async (req, res) => {
    try {
        const delete_area = await db.areas.update({
            isDelete: true
        }, {
            where: {
                id: req.body.id
            }
        });
        if (delete_area) {
            res.status(200).send({
                message: "Area eliminada correctamente"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Error al eliminar el area: " + error.message
        });
    }
}

const updateArea = async (req, res) => {
    try {

        const area = await db.areas.findByPk(req.body.id);
        if (!area) {
            return res.status(404).send({ message: 'area no encontrada' })
        }
        await db.areas.update(
            {
                nombre: req.body.nombre,
                idObjetivo: req.body.idObjetivo,
                idDimension: req.body.idDimension,
                idPEI: req.body.idPEI
            },
            { where: { id: req.body.id } })

        res.status(200).json({
            message: 'Area actualizada con exito'
        })

    } catch (error) {
        res.status(500).json({
            message: 'error al ingresar ' + error
        })
    }
}



const allAreasByidPEI = async (req, res) => {
    try {
      const areasByidPEI = await db.areas.findAll
    
      ({          
        where: {
            idPEI: req.body.idPEI, isDelete: false,
        }
      });
  
      return res.status(200).send({ areasByidPEI });
    } catch (error) {
      res.status(400).json({
        message: 'error al  buscar por el numero de PEI ' + error
      })
    }
  };

  const allAreasByidDimension = async (req, res) => {
    try {
      const areasByidDimension = await db.areas.findAll
      
      ({          
        where: {
            idDimension: req.body.idDimension, isDelete: false,
        }
      });
  
      return res.status(200).send({ areasByidDimension });
    } catch (error) {
      res.status(400).json({
        message: 'error al  buscar por el identificador de dimension' + error
      })
    }
  };


  const allAreasByidObjetivos= async (req, res) => {
    try {
      const areasByidObjetivos = await db.areas.findAll
      
      ({          
        where: {
            idObjetivo : req.body.idObjetivo, isDelete: false,
        }
      });
  
      return res.status(200).send({ areasByidObjetivos });
    } catch (error) {
      res.status(400).json({
        message: 'error al  buscar por el identificadaor de objetivo ' + error
      })
    }
  };


module.exports = {
    delete_area,
    newArea,
    updateArea,
    allAreasByidPEI,
    allAreasByidDimension,
    allAreasByidObjetivos}
