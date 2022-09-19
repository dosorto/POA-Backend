//const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  })
  app.post("/auth/login",controller.login);
  app.get("/auth/get-all",controller.allUser);
  app.post("/auth/create-user",controller.newUser);
  app.put("/user/update-user",controller.updateUser);
};


