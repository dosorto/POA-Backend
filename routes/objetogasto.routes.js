//const { authJwt } = require("../middleware");
const controller = require("../controllers/objetogasto.controller");
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

  app.get("/objetogasto/get_all", controller.AllObjeto);
  app.get("/objetogasto/eliminar/:id",controller.eliminarObjeto);
  app.post("/objetogasto/crear",controller.newObjetogasto);
  app.put("/objetogasto/actualizar",controller.updateObjeto);
  app.get("/objetogasto/get_all_by_id/:id", controller.AllObjeto_by_id)
};