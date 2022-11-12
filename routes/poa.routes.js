//const { authJwt } = require("../middleware");
const controller = require("../controllers/poa.controller");
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
  app.post("/POA/new_POA",controller.new_POA);
  app.get("/POA/get_POA",controller.get_POA);
  app.put("/POA/disablePOA",controller.disable_POA);
  app.put("/POA/updatePOA",controller.updatePOA);
  app.get("/POA/poaById/:idDepto",controller.get_all_pei_by_idDepto);
  app.get("/POA/poaById/:idUE",controller.get_all_pei_by_idUE);
  app.get("/POA/get/:id",controller.get_poa);
};