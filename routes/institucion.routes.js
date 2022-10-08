const controller = require("../controllers/institucion.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/institucion/get_all", controller.get_all_institucion);
  app.get("/institucion/get/:id",controller.get_institucion);
  app.put("/institucion/delete",controller.disable_institucion);
  app.put("/institucion/update",controller.update_institucion);
  app.post("/institucion/create",controller.new_institucion);
};