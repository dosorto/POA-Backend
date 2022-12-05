const controller = require("../controllers/fuentePoa.controller");
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
  app.get("/fuentePoa/get_all", controller.AllFuentePoa);
  app.get("/fuentePoa/eliminar/:id",controller.eliminarFuentePoa);
  app.post("/fuentePoa/crear",controller.newFuentePoa);
  app.put("/fuentePoa/actualizar",controller.updateFuentePoa);
  app.get("/fuentePoa/get_all_by_id/:id", controller.AllFuentePoa_by_id)
};