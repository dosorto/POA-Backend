const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
//const resultado = db.resultado;

const allResultado = async(req,res) => { 
    try{ 
      const allResultado =  await db.resultado.findAll({
      where: {
          isDelete: false,
      },
      include:[{
        model: db.areas, include :[{model:db.objetivos , include : [{model:db.dimension, include: [{model:db.pei}] 
        }]
        }]
      }]
    })
      return res.status(200).send({ allResultado });
  } catch(error){
      res.status(400).json({
        message:'error en la petición' + error
      })
  }
  };

  const allResultado_by_idArea= async(req,res) => { 
    try{ 
      const allResultado =  await db.resultado.findAll({
      where: {
          isDelete: false,
          idArea: req.params.idArea
      },
      include:[{
        model: db.areas, include :[{model:db.objetivos , include : [{model:db.dimension, include: [{model:db.pei}] 
        }]
        }]
      }]
    })
      return res.status(200).send({ allResultado });
  } catch(error){
      res.status(400).json({
        message:'error en la petición' + error
      })
  }
  };

  const newResultado = async(req, res) => {
    try{
      const resultado = await db.resultado.findOne({where:{nombre:req.body.nombre}})
        if(resultado){
            return res.status(400).json({message:'Nombre de resultado ya existente'});
        }
      const area = await db.areas.findByPk(req.body.idArea);
      if (!area){ 
        res.status(404).send({message:'no se encontro el área'});
      }
       await db.resultado.create({
            nombre : req.body.nombre,
            idArea : area.id,
            idObjetivos : area.idObjetivos,
            idDimension : area.idDimension,
            idPei : area.idPei
        })
        res.status(200).json({
          message:'Resultado creado con éxito'
        })
        
      } catch (error){
        res.status(400).json({
          message:'error al ingresar' + error
        })
      }
     };

    const deleteResultado = async(req, res) =>{
      try {
        const resultadoDelete = await db.resultado.update({
            isDelete: true
      },{
        where: {
          id: req.body.id
        }
      });
      if (resultadoDelete){
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
    };

    const updateResultado = async(req, res) =>{
      try {
        if(!req.body.nombre){
            return res.status(400).json({message:'Debe enviar todos los datos'});
        }
        const updateResultado = await db.resultado.update({
            nombre: req.body.nombre,
            idArea : req.body.idArea,
            idObjetivos : req.body.idObjetivos,
            idDimension : req.body.idDimension,
            idPei : req.body.idPei
        }, {
            where: {
                id: req.body.id
            }
        });
        if (updateResultado) {
            res.status(200).send({
                message: "Resultado actualizado con éxito",
                resultado : updateResultado
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
    };

    const getResultado = async (req,res) =>{
      try{
          const resultado = await db.resultado.findOne({where:{id:req.params.id}})
          if(!resultado){
              return res.status(404).json({message:'No se encuentra esa dimension'});
          }
          return res.status(200).json({status:"Ok",resultado});
      } catch(error){
          return res.status(500).json({status:"Server Error: " + error});
      }
  };

  module.exports = {
    allResultado,
    newResultado,
    deleteResultado,
    updateResultado,
    getResultado,
    allResultado_by_idArea
  }