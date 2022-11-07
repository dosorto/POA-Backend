const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
//const resultado = db.resultado;

//Controlador para mostrar todos los indicadores
const allIndicadores = async(req,res) => { 
    try{ 
      const allIndicadores =  await db.indicadores.findAll({
      where: {
          isDelete: false,
      },
      include:[{
        model: db.resultado,
      },{
        model: db.areas,
      },{
          model:db.objetivos ,
        },{
          model:db.dimension,
        },{
          model:db.pei,
        }]
    })
      return res.status(200).json( allIndicadores );
  } catch(error){
      res.status(400).json({
        message:'error en la petición' + error
      })
  }
  };

//Controlador para crear un indicador
const newIndicador = async(req, res) => {
    try{
      const indicador = await db.indicadores.findOne({where:{nombre:req.body.nombre}})
        if(indicador){
            return res.status(400).json({message:'Nombre del indicador ya existente'});
        }
      const resultado = await db.resultado.findByPk(req.body.idResultado);
      if (!resultado){ 
        res.status(404).send({message:'no se encontro el resultado'});
      }
       await db.indicadores.create({
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            idResultado : resultado.id,
            idArea : resultado.idArea,
            idObjetivos : resultado.idObjetivos,
            idDimension : resultado.idDimension,
            idPei : resultado.idPei
        })
        res.status(200).json({
          message:'Indicador creado con éxito'
        })
        
      } catch (error){
        res.status(400).json({
          message:'error al ingresar' + error
        })
      }
     };

//Controlador para actualizar un indicador
const updateIndicador = async(req, res) =>{
    try {
      if(!req.body.nombre){
          return res.status(400).json({message:'Debe enviar todos los datos'});
      }
      const resultado = await db.areas.findByPk(req.body.idResultado);
    if (!resultado){ 
      res.status(404).send({message:'no se encontro el resultado'});
    }
      const updateIndicador = await db.indicadores.update({
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          idResultado: resultado.id,
          idArea : resultado.idArea,
          idObjetivos : resultado.idObjetivos,
          idDimension : resultado.idDimension,
          idPei : resultado.idPei
      }, {
          where: {
              id: req.body.id
          }
      });
      if (updateIndicador) {
          res.status(200).send({
              message: "Indicador actualizado con éxito",
              indicador : updateIndicador
          });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({status:"Server Error: " + error});
  }
  };

  //Controlador para eliminar un indicador
  const deleteIndicador = async(req, res) =>{
    try {
      const indicadorDelete = await db.indicadores.update({
          isDelete: true
    },{
      where: {
        id: req.params.id
      }
    });
    if (indicadorDelete){
        res.status(200).send({
          message: "Indicador eliminado"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Error al elimiar el indicador " + error.message
    });
  }
  };

  //Controlador para obtener un Indicador por id
  const getIndicador = async (req,res) =>{
    try{
        const indicadores = await db.indicadores.findOne({
          where:{
            isDelete: false,
            id: req.params.id
          },
          include:[{
            model: db.resultado,
          },{
            model: db.areas,
          },{
              model:db.objetivos ,
            },{
              model:db.dimension,
            },{
              model:db.pei,
            }]
        })
        if(!indicadores){
            return res.status(404).json({message:'No se encuentra el indicador'});
        }
        return res.status(200).json({status:"Ok",indicadores});
    } catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
};

const AllIndicador_by_idResultado = async(req,res) => { 
    try{ 
      const allIndicadores =  await db.indicadores.findAll({
      where: {
          isDelete: false,
          idResultado: req.params.idResultado
      },
      include:[{
        model: db.resultado,
      },{
        model: db.areas,
      },{
          model:db.objetivos ,
        },{
          model:db.dimension,
        },{
          model:db.pei,
        }]
    })
    res.status(200).json( allIndicadores );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };
  module.exports = {
    allIndicadores,
    newIndicador,
    updateIndicador,
    deleteIndicador,
    getIndicador,
    AllIndicador_by_idResultado
    
  }