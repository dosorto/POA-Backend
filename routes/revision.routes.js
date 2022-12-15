
const controller = require("../controllers/revision.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/revision/create",controller.newRevision);
  app.post("/revision/update",controller.updateRevision);
  app.get("/revision/delete/:id",controller.deleteRevision);
  app.get("/revision/get_all/:idTarea",controller.allRevision_by_idTarea);
  app.get("/revision/actividadesByEstado/:idPoa",controller.actividadesByEstado);
};