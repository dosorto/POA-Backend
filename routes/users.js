var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', function(req, res, next) {
  res.send('pantalla de usuario');
});


router.post('create_user', function(req,res,next){
  try{
  const username = req.body.username;
  const password = req.body.password;
  const User = require('./models/usuario.model')
  User.create({
    usuario: username,
    password: bcrypt.hashSync(password, 8),
    idEmpleado: 1,
    idRol: 1
  });
  return res.status(200).json({
        message:"creado con exito"
    });
  }
  catch{
    return res.status(400).json({
      message:"error"
  });
  }
});
module.exports = router;
