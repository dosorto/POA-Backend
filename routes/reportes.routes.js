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
  app.get("/reportes/suma11/:idPoa", controller.suma_Fuente11);
  app.get("/reportes/suma12/:idPoa", controller.suma_Fuente12);
  app.get("/reportes/suma12B/:idPoa", controller.suma_Fuente12B);
  app.get("/reportes/nopresupuesto/:idPoa", controller.Tareas_sin_presupuesto);
  app.get("/reportes/presupuesto/:idPoa", controller.Tareas_con_presupuesto);
  app.get("/reportes/estado_Formulacio/:idPoa", controller.Actvidades_estadoF);
  app.get("/reportes/estado_ReFormulacion/:idPoa", controller.Actvidades_estadoRF);
  app.get("/reportes/estado_Revision/:idPoa", controller.Actvidades_estadoR);
  app.get("/reportes/estado_Aprobada/:idPoa", controller.Actvidades_estadoA);
  app.get("/reportes/estado_Rechazada/:idPoa", controller.Actvidades_estadoREC);
};
