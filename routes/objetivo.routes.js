//const { authJwt } = require("../middleware");
const controller = require("../controllers/objetivo.controller");
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

  app.get("/objetivos/get_all", controller.AllObjetivo);
  app.get("/objetivos/eliminar/:id",controller.eliminarObjetivo);
  app.get("/objetivos/get_all_by_Dimension/:idPei", controller.AllObjetivo_by_id_dimension);
  app.post("/objetivos/crear",controller.newObjetivo);
  app.put("/objetivos/actualizar",controller.updateObjetivo);
};