const db = require("../models");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
// controlador para crear una nueva area


const newArea = async (req, res) => {
    try {
      const area = await db.areas.findOne({where:{nombre:req.body.nombre}})
      if(area){
          return res.status(400).json({message:'Nombre de area ya utilizado'});
      }
      const objetivo = await db.objetivos.findOne({where:{id:req.body.idObjetivos}})
      if(!objetivo){
          return res.status(404).json({message:'Objetivo incorrecto'});
      }

       await db.areas.create({
            nombre: req.body.nombre,
            idObjetivos: req.body.idObjetivos,
            idDimension:objetivo.idDimension,
            idPei: objetivo.idPei
          });
          return res.status(200).json({status:"Ok"});
      } catch(error){
          return res.status(500).json({status:"Server Error: " + error});
      }
};

// Funcion para obtener una unica area
const get_area = async (req,res) =>{
  try{
      const area = await db.areas.findOne({where:{id:req.params.id}})
      if(!area){
          return res.status(404).json({message:'No se encuentra esa area'});
      }
      return res.status(200).json({status:"Ok",area});
  } catch(error){
      return res.status(500).json({status:"Server Error: " + error});
  }
}
//Funcion para obtener todas las areas
const get_all_areas = async (req,res) =>{
  try{
      const all_areas = await db.areas.findAll(
         { where:{
          isDelete:false
        },
         include:[{
          model: db.pei,
        },{
           model: db.dimension
        },
      {
       model: db.objetivos
      }]
        }
      );
      if(!all_areas){
          return res.status(404).send({message:'no hay ningun elemento'});
      }
      return res.status(200).json(all_areas);
  }catch(error){
      return res.status(500).json({status:"Server Error: " + error});
  }
};


//controlador para borrar un area del pei

const delete_area = async (req, res) => {
    try {
        const delete_area = await db.areas.update({
            isDelete: true
        }, {
            where: {
               id : req.body.id
            }
        });
        if (delete_area) {
            res.status(200).send({
                message: "Area eliminada correctamente"
            });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}



const disable_dimension = async (req, res) => {
  try {
      const temporally = await db.dimension.update({
          isDelete : true
      }, {
          where: {
              nombre: req.body.nombre
          }
      });
      if (temporally) {
          res.status(200).send({
              message: "Dimension eliminada con exito"
          });
      }
  } catch (error) {
      console.log(error);
      return res.status(500).json({status:"Server Error: " + error});
  }
}

const updateArea = async (req, res) => {
  try {
    if(!req.body.nombre){
      return res.status(400).json({message:'Debe enviar todos los datos'});
  }
  const objetivo = await db.objetivos.findOne({where:{id:req.body.idObjetivo}})
  if(!objetivo){
      return res.status(404).json({message:'Objetivo incorrecto'});
  }
  const temporally =  await db.areas.update(
          {
              nombre: req.body.nombre,
              idObjetivo: req.body.idObjetivo,
              idDimension:objetivo.idDimension,
            idPei: objetivo.idPei
          },
          { where: { id: req.body.id } });

          if (temporally) {
            res.status(200).send({
                message: "Area actualizada con exito",
                areas : temporally
            });
          }
        } catch (error) {
            console.log(error);
            return res.status(500).json({status:"Server Error: " + error});
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

 /* const get_Area = async (req,res) =>{
    try{
        const all_areas = await db.areas.findAll({
            where:{isDelete:false}
        });
        if(!all_areas){
            return res.status(404).send({message:'no hay ningun elemento'});
        }
        return res.status(200).json(all_areas);
    }catch(error){
        return res.status(500).json({status:"Server Error: " + error});
    }
}*/

const get_Area = async (req,res) =>{
  try{
      const area = await db.areas.findOne({where:{id:req.params.id}})
      if(!area){
          return res.status(404).json({message:'No se encuentra esa area'});
      }
      return res.status(200).json({status:"Ok",area});
  } catch(error){
      return res.status(500).json({status:"Server Error: " + error});
  }
}

const get_all_area_by_idObjetivo = async (req,res) =>{
  try{
      const all_area = await db.areas.findAll(
         { where:{isDelete:false,
                  idObjetivos : req.params.idObjetivos},
          include:db.objetivos}
      );
      if(!all_area){
          return res.status(404).send({message:'no hay ningun elemento'});
      }
      return res.status(200).json(all_area);
  }catch(error){
      return res.status(500).json({status:"Server Error: " + error});
  }
}

module.exports = {
    delete_area,
    newArea,
    updateArea,
    allAreasByidPEI,
    allAreasByidDimension,
    allAreasByidObjetivos,
    get_Area,
    get_all_areas,
    get_all_area_by_idObjetivo
  }
