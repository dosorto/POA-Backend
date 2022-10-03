//const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express;


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
  app.post("/auth/changePassword",controller.changePassword);
  app.post("/auth/allUser",controller.allUser);

  app.post("/auth/forgotPassword",controller.forgotPassword); 
  app.post("/auth/newPassword",controller.newPassword); 
};
  
  /*var transporter
   transporter.sendMail(mailoption, (error,info)=>{
  if(error){
    res.status(500).send(error.message);
  }else{
    console.log("email enviado con exitso");
    res.status(200).jsonp(req.body);
  }
});

app.post("/send-email",(req,res)=>{
   transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'tara93@ethereal.email',
        pass: 'JBxDPpG98jydJ9qyU7',
    },
});
  });
  
const mailoption={
  from: "csanchezo@unah.hn",
  to:"tara93@ethereal.email",
  subject:"enviado desde nodemailer",
  text: "hola mundo"};




  app.listen(3000,()=>{
    console.log("servidor en -> http://localhost:3000");
  });


   var mailOptions = {
    from:'admistrar.poa.curlp@gmail.com', // sender address
    to: db.user.username, // list of receivers
    subject: "Recupera tu contraseña ✔", // Subject line
    html: `
    <b>POR FAVOR HAZ CLICK EN EL SIGUIENTE EN LACE PARA RECUPERAR TU CONTRASEÑA O COPIA EL LINK EN TU NAVEGADOR</b>
    <a href="${verificationLink}">${verificationLink}</a>`

 };
 transporter.sendMail(mailOptions, function(error, info){
  if(error){
      console.log(error);
      res.json({yo: 'error'});
  }else{
      console.log('Message sent: ' + info.response);
      res.json({yo: info.response});
  };
});


const nodemailer = require("nodemailer");
  
  // create reusable transporter object using the default SMTP transport
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'admistrar.poa.curlp@gmail.com', // generated ethereal user
      pass: 'wphgvdcltjsnckir', // generated ethereal password
    },
  });


  transporter.verify().then(()=>{
    console.log('ready for send emails')
  });

*/