//const { authJwt } = require("../middleware");
const controller = require("../controllers/presupuesto.controller");
//const controllerauth = require("../controllers/auth.controller");
//const { permisosJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

//   app.get("/objetivos/get_all", controller.AllObjetivo);
//   app.get("/objetivos/eliminar/:id",controller.eliminarObjetivo);
//   app.post("/objetivos/crear",controller.newObjetivo);
//   app.put("/objetivos/actualizar",controller.updateObjetivo);
  app.get("/presupuesto/presupuesto_by_idtarea/:nombre", controller.presupuesto_by_idTarea)
  app.get("/presupuesto/prueba", controller.probando_like)
};