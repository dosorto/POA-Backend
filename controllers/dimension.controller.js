const db = require("../models/");
const config = require("../config/auth.config");

// -------------------------------
const allPei = async (req,res) => {
  try {
    const { id } = req.params;

    const peis = await db.dimension.findAll({
      where: {idPei: id}
    });
    return res.json(peis);
  } catch (error) {

  }  
};

const editar = async (req, res) => {
  try {
    const dimension = await db.dimension.findByPk(req.params.id);

    if (!dimension) {
      db.dimension.set(req.body);
      await db.dimension.save();
      return res.json(dimension)
    } else {
      return console.log("La dimension a editar no existe");
    }
  } catch (error) {
    res.status(400).json({
    message:'error: ' + error
    });
  }
};

const agregar = async (req, res) => {
  try {
    db.dimension.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
  });
  return res.status(200).json({status:"ok"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({status:"error", error: error});
  }
}

const borrar = async (req, res) => {
  try {
    const { id } = req.params;
    const dimension = await db.dimension.destroy({
      where: {
        id,
      },
    });
    console.log(dimension);
    res.sendStatus(204);
  } catch (error) {
    res.status.json({mensage: error.mesage})
  }
}

module.exports = {
  allPei,
  editar,
  borrar,
  agregar
}