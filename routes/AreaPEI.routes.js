const controller = require("../controllers/area.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/area/crear",controller.newArea);
  app.post("/area/eliminar",controller.delete_area);
  app.post("/area/editar",controller.updateArea);
  app.post("/area/allByPEI",controller.allAreasByidPEI);
  app.post("/area/allByObjetivos",controller.allAreasByidObjetivos);
  app.post("/area/allByDimension",controller.allAreasByidDimension);
  app.get("/area/getArea",controller.get_Area);
};



