const controller = require("../controllers/dimension.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/dimension/allPei/:id", controller.allPei);
    app.post("/dimension/agregar",controller.agregar);
    app.put("/dimension/editar/:id",controller.editar);
    app.delete("/dimension/borrar/:id",controller.borrar);
  };