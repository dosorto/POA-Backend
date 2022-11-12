//const { authJwt } = require("../middleware");
const controller = require("../controllers/indicadoresPoa.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  })

  app.get("/indicadoresPOA/get-all",controller.allindicadores);
//   app.get("/indicadores/getResultado/:id",controller.getResultado);
//   app.get("/indicadores/getResultado_by_idArea/:idArea",controller.AllResultado_by_idArea);
  app.post("/indicadoresPOA/crear",controller.newIndicador);
  app.get("/indicadoresPOA/deleteResultado/:id",controller.deleteIndicador);
  app.put("/indicadoresPOA/updateResultado",controller.updateIndicador);
};