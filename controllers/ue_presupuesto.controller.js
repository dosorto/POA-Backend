const db = require("../models/");

const new_ue_presupuesto = async (req, res) => {
    try{
        const ue_presupuesto = await db.ue_presupuesto.findOne({
            where:{
                anio:req.body.anio,
                idUnidadEjecutora: req.body.idUnidadEjecutora
            }
        })

        if(ue_presupuesto){ return res.status(403).send({message:'Error, elemento ya existe'})};

        await db.ue_presupuesto.create({
            anio: req.body.anio,
            fuente11: req.body.fuente11,
            fuente12:req.body.fuente12,
            fuente12B: req.body.fuente12B,
            idUnidadEjecutora:req.body.idUnidadEjecutora
        })
        return res.status(200).send({message:'ok'});
    }catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}

const update_ue_presupuesto  = async (req, res) => {
    try{
        const ue_presupuesto = await db.ue_presupuesto.findOne({
            where:{
                anio:req.body.anio,
                idUnidadEjecutora: req.body.idUnidadEjecutora
            }
        })

        if(!ue_presupuesto){ return res.status(404).send({message:'Error, elemento no encontrado'})};

        await db.ue_presupuesto.update({
            anio: req.body.anio,
            fuente11: req.body.fuente11,
            fuente12:req.body.fuente12,
            fuente12B: req.body.fuente12B,
            idUnidadEjecutora:req.body.idUnidadEjecutora
        }, {
            where:{
                id: ue_presupuesto.id
            }
        })
        return res.status(200).send({message:'ok'});
    }catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}
const delete_ue_presupuesto  = async (req, res) => {
    try{

        await db.ue_presupuesto.update({
            idDelete : true
        },{
            where:{
                id:req.params.id
            }
        })

        return res.status(200).send({message:'eliminado correctamente'})

    } catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}

const get_all_ue_presupuesto  = async (req, res) => {
    try{
        const all_ue_presupuesto = await db.ue_presupuesto.findAll({
            where:{
                idUnidadEjecutora:req.params.idUnidadEjecutora
            }
        })
        return res.status(200).send(all_ue_presupuesto);
    } catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}
const get_one_ue_presupuesto  = async (req, res) => {
    try{
        const ue_presupuesto = await db.ue_presupuesto.findOne({
            where:{
                id:req.params.id
            }
        })
        return res.status(200).send(ue_presupuesto);
    } catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}
const get_status_ue_presupuesto  = async (req, res) => {
    try{
        let fuente11 = 0;
        let fuente12 = 0;
        let fuente12B = 0;

        const poas = await db.poa.findAll({
            where:{
                idUE:req.params.idUnidadEjecutora,
                anio:req.params.anio
            }
        })
        const presupuesto = await db.ue_presupuesto.findOne(
            {where:{
                idUnidadEjecutora : req.params.idUnidadEjecutora,
                anio:req.params.anio
            }}
        )
        for (let i = 0; i < poas.length; i++) {
                fuente11 += parseFloat(poas[i].fuente11);
                fuente12 += parseFloat(poas[i].fuente12);
                fuente12B+= parseFloat(poas[i].fuente12B);

          }
          return res.status(200).send(
            {
            fuente11,
            fuente12,
            fuente12B,
            fuente11_base:parseFloat(presupuesto.fuente11),
            fuente12_base:parseFloat(presupuesto.fuente12),
            fuente12B_base:parseFloat(presupuesto.fuente12B),
            fuente11_restante:parseFloat(presupuesto.fuente11) - fuente11,
            fuente12_restante:parseFloat(presupuesto.fuente12) - fuente12,
            fuente12B_restante:parseFloat(presupuesto.fuente12B) - fuente12B
          }
          );
    } catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}

const get_status_depto = async (req, res) => {
    try{
        const Poa = await db.poa.findOne({
            where:{
                idUE:req.body.idUnidadEjecutora,
                idDepto:req.body.idDepto,
                anio:req.body.anio
            }
        })
        if(!Poa){
            return res.status(200).send({res:false});
        }
        return res.status(200).send({res:true,
        poa:Poa});

    }catch(e){
        return res.status(500).send({message:'Error en el server : ' + e});
    }
}

module.exports = {
    new_ue_presupuesto,
    update_ue_presupuesto,
    delete_ue_presupuesto,
    get_all_ue_presupuesto,
    get_one_ue_presupuesto,
    get_status_ue_presupuesto,
    get_status_depto
}