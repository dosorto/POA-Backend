const controller = require("../controllers/area.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/area/get_All",controller.get_all_areas);
  app.get("/area/get/:id",controller.get_Area);
  app.put("/area/eliminar",controller.delete_area);
  app.put("/area/editar",controller.updateArea);
  app.post("/area/crear",controller.newArea);

  app.post("/area/allByPEI",controller.allAreasByidPEI);
  app.get("/area/allByObjetivos/:idObjetivo",controller.allAreasByidObjetivos);
  app.post("/area/allByDimension",controller.allAreasByidDimension);

};



