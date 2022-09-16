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
  app.post("/user/login",(req,res) => controller.login);
  app.get("/user/get-all",(req,res) => controller.getAll);
  app.post("/user/create-user",(req,res) => controller.newUser);
};


