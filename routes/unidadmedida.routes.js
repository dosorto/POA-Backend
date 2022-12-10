//const { authJwt } = require("../middleware");
const controller = require("../controllers/unidadmedida.controller");
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
  app.get("/unidad/get_all", controller.AllUnidadMedida);
  app.get("/unidad/eliminar/:id",controller.eliminarUnidadMedida);
  app.post("/unidad/crear",controller.newUnidadMedida);
  app.put("/unidad/actualizar",controller.updateUnidadMedida);
  app.get("/unidad/get_all_by_id/:id", controller.AllUnidadmedida_by_id)
};