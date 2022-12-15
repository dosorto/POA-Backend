const controller = require("../controllers/unidadEjecutora.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/unidad_ejecutora/get_all/:idInstitucion", controller.get_all_ue);
  app.get("/unidad_ejecutora/get/:id",controller.get_ue);
  app.put("/unidad_ejecutora/delete",controller.disable_ue);
  app.put("/unidad_ejecutora/update",controller.update_ue);
  app.post("/unidad_ejecutora/create",controller.new_ue);
}