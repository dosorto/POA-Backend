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
  app.post("/PEI/new_PEI",controller.new_PEI);
  app.get("/PEI/get_PEI",controller.get_PEI);
  app.put("/PEI/disablePEI",controller.disable_PEI);
  app.put("/PEI/updatePEI",controller.updatePEI);
  app.get("/PEI/peiById/:idInstitucion",controller.get_all_pei_by_idInstitucion);
  app.get("/PEI/get/:id",controller.get_pei);
};