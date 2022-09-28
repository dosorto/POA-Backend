const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model } = require("sequelize");
const {  user,  roles_permiso, role } = require("../models/");

const newPermiso = async (req,res) =>{
    try{
        db.permiso.create({
            Permiso: req.body.Permiso,
            Descripcion: req.body.Descripcion,
        });
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_permiso_by_id = async (req,res) =>{
    try{

        
        const user = await db.user.findOne({
            where: {
              IsDelete: false,
              id: req.body.id
            }, include: [{
              model: db.role,
              include:[
                {
                    model: db.permiso,
                }
              ]
            },{model: db.empleado },]
          });
        return res.status(200).json({user})
       /*const idRol = await db.role.findOne({
        attributes:['id'],
        include:{
            model:user,
            attributes:['username'],
            where:{
                id: req.body.id 
            }
        },
        });

    const idPermiso = await db.roles_permiso.findAll({
        attributes:['idPermiso'],
        where:{
        idRol: idRol.id
    }});

    const permisos = await db.permiso.findAll({
        attributes:['Permiso','Descripcion'],
        idPermiso: idPermiso.id = 'idPermiso'
    }/*,{where:{ [Op.in]:[{
        idRol: idRol.id
    },{idPermiso: idPermiso.id}] 
    })


       return res.status(200).json({idRol,idPermiso,permisos})*/
    }catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

module.exports = {
    newPermiso,
    get_permiso_by_id
  }