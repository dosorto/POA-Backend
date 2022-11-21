const controller = require("../controllers/departamento.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/departamento/get_all", controller.get_all_departamento);
  app.get("/departamento/get/:id",controller.get_departamento);
  app.put("/departamento/delete",controller.disable_departamento);
  app.put("/departamento/update",controller.update_departamento);
  app.post("/departamento/create",controller.new_departamento);
};



