const controller = require("../controllers/reportes.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/reportes/get_all/:id", controller.get_all_departamento);
  app.get("/reportes/get_all_depto/:idDepto/:id", controller.get_all_poa_by_idDepto);
  app.get("/reportes/get_all_depto_poa/:idPoa/:idDepto", controller.AllTarea_by_depto_poa);

};
