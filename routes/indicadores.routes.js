//const { authJwt } = require("../middleware");
const controller = require("../controllers/indicadores.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  })

   app.get("/indicadores/get-all",controller.allIndicadores);
   app.get("/indicadores/getIndicador/:id",controller.getIndicador);
   app.get("/indicadores/getIndicador_by_idResultado/:idResultado",controller.AllIndicador_by_idResultado);
   app.post("/indicadores/crear",controller.newIndicador);
   app.get("/indicadores/deleteIndicador/:id",controller.deleteIndicador);
   app.put("/indicadores/updateIndicador",controller.updateIndicador);
};