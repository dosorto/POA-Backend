//const { authJwt } = require("../middleware");
const controller = require("../controllers/permiso.controller");
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
  app.post("/permiso/create_permiso",controller.newPermiso);
  app.get("/permiso/get_permiso/",controller.get_permiso_by_id)
};