const db = require("../models");

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
      include:[{model:db.actividad},{model:db.poa},{model:db.depto},{model:db.presupuesto, include:[{model:db.grupogasto},{model: db.objetogasto},{model:db.unidadmedida},{model:db.fuente}]}
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
  

module.exports = {
    get_all_departamento,
    get_all_poa_by_idDepto,
    AllTarea_by_depto_poa
}