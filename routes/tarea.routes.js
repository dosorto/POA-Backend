//const { authJwt } = require("../middleware");
const controller = require("../controllers/tareas.controller");
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
  app.get("/tarea/prueba/:nombre", controller.probando_like)
  app.get("/tarea/get_all", controller.AllTareas);
  app.get("/tarea/eliminar/:id",controller.eliminarTarea);
  app.post("/tarea/crear",controller.newTarea);
  app.put("/tarea/actualizar",controller.updateTarea);
  app.get("/tarea/get_all_by_id/:id", controller.AllTareas_by_id)
  app.get("/tarea/get_all_by_idActividad/:idActividad", controller.AllTarea_by_idActividad)
  app.get("/tarea/get_all_presupuesto/:idActividad", controller.AllTarea_by_idActividad_presupuesto),
  app.get("/tarea/suma/:idActividad", controller.sumaPresupuestos_Fuente11)
  app.get("/tarea/suma_fuente12/:idActividad", controller.sumaPresupuestos_Fuente12)
  app.get("/tarea/suma_fuente12B/:idActividad", controller.sumaPresupuestos_Fuente12B)
  app.get("/tarea/suma_11/:id", controller.suma11)
}