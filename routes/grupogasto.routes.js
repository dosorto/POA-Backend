//const { authJwt } = require("../middleware");
const controller = require("../controllers/grupogasto.controller");
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
  app.get("/grupogasto/get_all", controller.AllGrupo);
  app.get("/grupogasto/eliminar/:id",controller.eliminarGrupo);
  app.post("/grupogasto/crear",controller.newGrupo);
  app.put("/grupogasto/actualizar",controller.updateGrupo);
  app.get("/grupogasto/get_all_by_id/:id", controller.AllGrupo_by_id)
};