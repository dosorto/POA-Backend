var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user/:id', function(req, res, next) {
  res.send('pantalla de usuario ' + req.params.id);
});


router.post('/create_user', function(req,res,next){
  try{
  const { username , password} = req.body;
  const User = require('../models/usuario.model')
  User.create({
    usuario: username,
    password: bcrypt.hashSync(password, 8),
    idEmpleado: 1,
    idRol: 1
  });
  return res.status(200).json({
        username,
        password,
        message : "agregado con exito"
    });
    
  }
  catch(error){
    return res.status(400).json({
      message:"error" + error
  });
  } 
});

router.get("/list", (req,res) =>{
    res.status(200).json({ list: ["user1","user2","user3"] })
}
);


module.exports = router;


