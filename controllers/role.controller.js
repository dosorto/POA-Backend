const db = require("../models/");
const config = require("../config/auth.config");
const { request, response } = require('express');
const { Op, DataTypes, Model, where } = require("sequelize");

const new_rol = async (req,res) =>{
    try{
        //db.sequelize.authenticate();
        const role = await db.role.create({
            rol: req.body.rol,
            descripcion: req.body.descripcion,
        });
        for(let i = 0; i < req.body.list_permisos.length; i++){
            db.roles_permiso.create({
                idRol : role.id,
                idPermiso : parseInt(req.body.list_permisos[i])
            })
        }
        return res.status(200).json({status:"ok"});
    } catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_roles = async (req,res) =>{
    try{
        const roles = await db.role.findAll({where:{
            isDelete:false
        }});
        if(!roles){
            return res.status(400).send("<h1>No existe ni un empleado</h1>");
        }
        return res.status(200).json(roles);
    }catch(error){
        return res.status(400).json({status:"Bad Request", error:error});
    }
}

const get_rol_by_id = async (req,res) =>{
    try{
       const rol = await db.role.findByPk(req.params.id);
       return res.status(200).json({rol})
    }catch(error){
        console.log("error: " + error);
        return res.status(400).json({status:"error", error : error});
    }
}

const get_permisos_by_id_rol = async(req,res) =>{
    try{

        const id_permisos = await db.roles_permiso.findAll({where:{
            idRol : req.body.idRol
        }})
        const permisos = []
        for(let i = 0; i < id_permisos.length; i++){
            permisos.push(await db.permiso.findOne({where:{id:id_permisos[i].idPermiso}}))
        }

        if(!id_permisos){
            return res.status(404).send({message:'el rol no tiene permisos'});
        }
        return res.status(200).send(permisos);
    }catch(e){
        return res.status(500).send({message:'rol no encontrado'});
    }

}

const deleteRol = async (req,res) => {
    try{
        await db.role.update({
            isDelete:true
        },{
            where:{
                id:req.params.id
            }
        })
        return res.status(200).send({message:'ok'})
    }catch(e){
        return res.status(500).send({message:'error ' + e})
    }
}

const updateRol = async(req,res) =>{
    try {

        const rol = await db.role.findByPk(req.body.id);
      if (!rol){ 
        res.status(404).send({message:'no se encontro el rol'});
      }
        await db.role.update({
          role:req.body.role,
          descripcion:req.body.descripcion
        }, {
            where: {
                id: req.body.id
            }
        });
        
        res.status(200).send({message: "Resultado actualizado con éxito"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"Server Error: " + error});
    }
}

module.exports = {
    get_roles,
    new_rol,
    get_rol_by_id,
    get_roles,
    get_permisos_by_id_rol,
    deleteRol,
    updateRol
  }








