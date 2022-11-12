const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
//const resultado = db.resultado;

const allindicadores = async(req,res) => { 
    try{ 
      const allIndicador =  await db.indicadoresPoa.findAll({
      where: {
          isDelete: false,
      }
    })
      return res.status(200).json( allIndicador );
  } catch(error){
      res.status(400).json({
        message:'error en la petición' + error
      })
  }
  };

  const newIndicador = async(req, res) => {
    try{
      const Indicador = await db.indicadoresPoa.findOne({where:{nombre:req.body.nombre}})
        if(Indicador){
            return res.status(400).json({message:'Nombre del indicador ya existente'});
        }
      
       await db.indicadoresPoa.create({
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            cantidadPlanificada : req.body.cantidadPlanificada,

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

    const deleteIndicador = async(req, res) =>{
      try {
        const indicadorDelete = await db.indicadoresPoa.update({
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

    const updateIndicador = async(req, res) =>{
      try {
        if(!req.body.nombre){
            return res.status(400).json({message:'Debe enviar todos los datos'});
        }
        const updateIndicador = await db.indicadoresPoa.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            cantidadPlanificada : req.body.cantidadPlanificada
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

//     const getResultado = async (req,res) =>{
//       try{
//           const resultado = await db.resultado.findOne({
//             where:{
//               isDelete: false,
//               id: req.params.id
//             },
//             include:[{
//               model: db.areas,
//             },{
//                 model:db.objetivos ,
//               },{
//                 model:db.dimension,
//               },{
//                 model:db.pei,
//               }]
//           })
//           if(!resultado){
//               return res.status(404).json({message:'No se encuentra el resultado'});
//           }
//           return res.status(200).json({status:"Ok",resultado});
//       } catch(error){
//           return res.status(500).json({status:"Server Error: " + error});
//       }
//   };

//   const AllResultado_by_idArea = async(req,res) => { 
//     try{ 
//       const allResultado =  await db.resultado.findAll({
//       where: {
//           isDelete: false,
//           idArea: req.params.idArea
//       },
//       include:[{
//         model: db.areas,
//       },{
//           model:db.objetivos ,
//         },{
//           model:db.dimension,
//         },{
//           model:db.pei,
//         }]
//     })
//     res.status(200).json( allResultado );
//   } catch(error){
//       res.status(400).json({
//         message:'error al ingresar' + error
//       })
//   }
//   };

  module.exports = {
    allindicadores,
    newIndicador,
    deleteIndicador,
    updateIndicador,
    // getResultado,
    // AllResultado_by_idArea
  }