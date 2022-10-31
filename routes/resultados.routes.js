//const { authJwt } = require("../middleware");
const controller = require("../controllers/resultado.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  })

  app.get("/resultados/get-all",controller.allResultado);
  app.get("/resultados/getResultado/:id",controller.getResultado);
  app.get("/resultados/get-all_by_idArea/:idArea",controller.allResultado_by_idArea);
  app.post("/resultados/newResultado",controller.newResultado);
  app.put("/resultados/deleteResultado",controller.deleteResultado);
  app.put("/resultados/updateResultado",controller.updateResultado);
};