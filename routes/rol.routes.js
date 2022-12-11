//const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");
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
  app.post("/rol/create_rol",controller.new_rol);
  app.post("/rol/update",controller.updateRol);
  app.post("/rol/permisos_by_id_rol",controller.get_permisos_by_id_rol);
  app.get("/rol/get_rol/:id",controller.get_rol_by_id);
  app.get("/rol/get_roles",controller.get_roles);
  app.get("/rol/delete/:id",controller.deleteRol);

};

