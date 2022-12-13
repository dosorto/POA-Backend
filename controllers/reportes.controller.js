const db = require("../models");
const { Op, DataTypes, Model, and, or } = require("sequelize");

const get_all_departamento = async (req, res) => {
    try {
        const all_depto = await db.depto.findAll({
            where: { isDelete: false,
                    id:req.params.id
                    },
                    include:[{model:db.depto},[{model:db.actividad,include:[                       
                        {model:db.tarea,include:[{model:db.presupuesto,include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente,      
                        }
                      ]}]} 
                    ]
                    
                    
        }]],
                                  
        });
        if (!all_depto) {
            return res.status(404).send({ message: 'no hay ningun elemento' });
        }
        return res.status(200).json(all_depto);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

const get_all_poa_by_idDepto = async (req, res) => {
    try {
        const all_poas = await db.poa.findAll(
            {
                where: {
                    isDelete: false,
                    idDepto: req.params.idDepto,
                    id:req.params.id
                },
                include:[{model:db.actividad}]
                //     ,include:                       
                //     {model:db.tarea,include:[{model:db.presupuesto,include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}
                //   ]}]}  
            }
        );
        if (!all_poas) {
            return res.status(404).send({ message: 'No hay ningún elemento' });
        }
        return res.status(200).json(all_poas);
    } catch (error) {
        return res.status(500).json({ status: "Server Error: " + error });
    }
}

const AllTarea_by_depto_poa = async(req,res) => { 
    try{ 
      const allTarea =  await db.tarea.findAll({
      where: {
          isDelete: false,
          idPoa: req.params.idPoa,
          idDepto: req.params.idDepto
      },
      include:[{model:db.actividad,include:[{model:db.indicadoresPoa},{model:db.planificacion},{model:db.ACencargados,include:[{model:db.empleado}]}]},{model:db.poa},{model:db.depto},{model:db.presupuesto, include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}
    ],order: [
      // will return `name`
      ['createdAt','DESC']]
   
      
    })
    res.status(200).json( allTarea );
  } catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
  }
  };

  const suma_Fuente11 = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const sumaFuente11 =  await db.tarea.findAll({
        where: {
            isDelete: false,
            isPresupuesto: true,
            idPoa: req.params.idPoa
            },
            include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto,
                where:{ idfuente:{[Op.eq]: 1 } },
                include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}]
    })
      res.status(200).json( sumaFuente11 );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }
  
  const suma_Fuente12 = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const sumaFuente11 =  await db.tarea.findAll({
        where: {
            isDelete: false,
            isPresupuesto: true,
            idPoa: req.params.idPoa
            },
            include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto,
                where:{ idfuente:{[Op.eq]: 2 } },
                include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}]
    })
      res.status(200).json( sumaFuente11 );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const suma_Fuente12B = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const sumaFuente11 =  await db.tarea.findAll({
        where: {
            isDelete: false,
            isPresupuesto: true,
            idPoa: req.params.idPoa
            },
            include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto,
                where:{ idfuente:{[Op.eq]: 3 } },
                include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}]
    })
      res.status(200).json( sumaFuente11 );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Tareas_sin_presupuesto = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const sumaFuente11 =  await db.tarea.findAll({
        where: {
            isDelete: false,
            isPresupuesto: false,
            idPoa: req.params.idPoa
            },
            include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto,
                include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}]
    })
      res.status(200).json( sumaFuente11 );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Tareas_con_presupuesto = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const sumaFuente11 =  await db.tarea.findAll({
        where: {
            isDelete: false,
            isPresupuesto: true,
            idPoa: req.params.idPoa
            },
            include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto,
                include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}]
    })
      res.status(200).json( sumaFuente11 );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }



  const Actvidades = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }
  const Actvidades_estadoF = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            estado:'FORMULACION',
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Actvidades_estadoRF = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            estado:'REFORMULACION',
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Actvidades_estadoR = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            estado:'REVISION',
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Actvidades_estadoA = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            estado:'APROBADO',
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }

  const Actvidades_estadoREC = async(req,res) => {
    try{
      //const actividad = await db.actividad.findByPk(req.body.idActividad);
      const act_estado =  await db.actividad.findAll({
        where: {
            isDelete: false,
            estado:'RECHAZADO',
            idPoa: req.params.idPoa
            },
            })
      res.status(200).json( act_estado );
    }catch(error){
      res.status(400).json({
        message:'error al ingresar' + error
      })
    }
  }
  

module.exports = {
    get_all_departamento,
    get_all_poa_by_idDepto,
    AllTarea_by_depto_poa,
    suma_Fuente11,
    suma_Fuente12,
    suma_Fuente12B,
    Tareas_sin_presupuesto,
    Tareas_con_presupuesto,
    Actvidades_estadoF,
    Actvidades_estadoRF,
    Actvidades_estadoR,
    Actvidades_estadoA,
    Actvidades_estadoREC,
    Actvidades
}