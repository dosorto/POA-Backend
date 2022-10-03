//const { authJwt } = require("../middleware");
const controller = require("../controllers/PEI.controller");
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
  app.post("/auth/new_PEI",controller.new_PEI);
  app.get("/auth/get_PEI",controller.get_PEI);
  app.post("/auth/disablePEI",controller.disable_PEI);
};