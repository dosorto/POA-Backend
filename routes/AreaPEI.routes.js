const controller = require("../controllers/area.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/peiArea/crear",controller.newArea);
  app.get("/peiArea/eliminar",controller.delete_area);
  app.post("/peiArea/editar",controller.updateArea);
  app.get("/peiArea/allByPEI",controller.allAreasByidPEI);
  app.post("/peiArea/allByObjetivos",controller.allAreasByidObjetivos);
  app.post("/peiArea/allByDimension",controller.allAreasByidDimension);
  app.get("/Area/AllAreas",controller.allAreas);
};



