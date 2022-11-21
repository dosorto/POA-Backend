const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const { tarea, grupogasto } = require("../models/");



const allPresupuesto = async(req,res) => { 
  try{ 
    const allPresupuesto =  await db.presupuesto.findAll({
    where: {
        isDelete: false,
    },
    include:[{
      model: db.tarea,
    },{
        model:db.objetogasto ,
      },{
        model:db.grupogasto,
      },{
        model:db.unidadmedida,
      },{
        model:db.fuente,
      }]
  })
    return res.status(200).json( allPresupuesto );
} catch(error){
    res.status(400).json({
      message:'error en la petición' + error
    })
}
}

/// por nombre esta ahorita
const presupuesto_by_idTarea = async(req,res) => { 
  try{ 
    const allPresupuesto =  await db.presupuesto.findAll({
    where: {
        isDelete: false,
        idtarea: req.params.idtarea
    },
    include:[{
      model: db.tarea,
    },{
        model:db.objetogasto ,
      },{
        model:db.grupogasto,
      },{
        model:db.unidadmedida,
      },{
        model:db.fuente,
      }]
  })
    return res.status(200).json( allPresupuesto );
} catch(error){
    res.status(400).json({
      message:'error en la petición' + error
    })
}
}

  // const probando_like = async(req,res) => { 
  //   try{ 
  //     const onepresupuesto =  await db.presupuesto.findOne({
       
  //     include:[{
  //       model: db.tarea,
  //       isDelete: false,
  //           name: {
  //               substring: req.body.nombre
  //             }
  //   },{
  //       model: db.objetogasto,
  //       // where: {
  //       //     isDelete: false,
  //       //     name: {
  //       //         like: '%'+req.body.tarea.nombre+'%'
  //       //       }
  //       // },
  //       }]
  //   })
  //   res.status(200).json( onepresupuesto );
  // } catch(error){
  //     res.status(400).json({
  //       message:'error al mostrar' + error
  //     })
  // }
  // };

  const newPresupuesto = async (req, res) => {
    try{
      const objeto= await db.objetogasto.findByPk(req.body.idobjeto)
    await db.presupuesto.create({
        cantidad: req.body.cantidad,
        costounitario: req.body.costounitario,
        total:req.body.total,
        idobjeto: objeto.id,
        idgrupo: objeto.idgrupo,
        idtarea: req.body.idtarea,
        idfuente: req.body.idfuente,
        idunidad: req.body.idunidad
      })
      res.status(200).json({
        message: 'usuario creado con exito'
      })
  
    } catch (error) {
      res.status(400).json({
        message: 'error al ingresar' + error
      })
    }
  };

  const deletePresupuesto = async(req, res) =>{
    try {
      const presupuestodelete = await db.presupuesto.update({
          isDelete: true
    },{
      where: {
        id: req.params.id
      }
    });
    if (presupuestodelete){
        res.status(200).send({
          message: "presupuesto baja en el backend"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Error al elimiar el usuario " + error.message
    });
  }
  };   
  
  const updatePresupuesto= async(req, res) =>{
    try {

      const tarea = await db.tarea.findByPk(req.body.idtarea);
      const objeto= await db.objetogasto.findByPk(req.body.idobjeto)
    if (!tarea){ 
      res.status(404).send({message:'no se encontro la tarea'});
    }
      const updatePresupuesto = await db.presupuesto.update({
        cantidad: req.body.cantidad,
        costounitario: req.body.costounitario,
        total:req.body.total,
        idobjeto: objeto.id,
        idgrupo: objeto.idgrupo,
        idtarea: tarea.id,
        idfuente: req.body.idfuente,
        idunidad: req.body.idunidad
      }, {
          where: {
              id: req.body.id
          }
      });
      if (updatePresupuesto) {
          res.status(200).send({
              message: "Resultado actualizado con éxito",
              resultado : updatePresupuesto
          });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({status:"Server Error: " + error});
  }
  };

  module.exports = {
   presupuesto_by_idTarea,
   allPresupuesto,
   newPresupuesto,
   updatePresupuesto,
   deletePresupuesto
  }