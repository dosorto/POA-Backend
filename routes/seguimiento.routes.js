//const { authJwt } = require("../middleware");
const controller = require("../controllers/seguimiento.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  })

  app.get("/seguimientoTareas/get_all",controller.allSeguimientos);
  app.get("/seguimientoTareas/getSeguimiento_by_idTarea/:idTarea",controller.AllSeguimiento_by_idTarea);
  app.post("/seguimientoTareas/crear",controller.newSeguimiento);
  app.put("/seguimientoTareas/updateSeguimiento",controller.updateSeguimiento);
  app.post("/seguimientoTareas/crearMedio",controller.newMedVer);
};