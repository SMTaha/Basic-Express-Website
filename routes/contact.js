var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function (req, res) {
  res.render('contact', {title: 'Contact'})
});

router.post('/send', function (req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user: 's.m.taha10@gmail.com',
      pass: '456gmail852'
    }
  });
  var mailOptions = {
    form: 'John Doe <john@doe.com>',
    to: 's.m.taha10@gmail.com',
    subject: 'Website Submission',
    text: `You have a new submission with the following details ... \n
           Name: {$req.body.name} \n
           Email: {req.body.email} \n
           Message: {req.body.message}
           `,
   html: `<p>You got a new submission with the following details...</p>
          <ul>
            <li>Name: {req.body.name}</li>
            <li>Email: {req.body.email}</li>
            <li>Message: {req.body.message}</li>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect('/');
    }else {
      console.log(`Message Sent {info.response}`);
      res.redirect('/')
    }
  })
});
module.exports = router;
