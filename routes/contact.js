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
      user: 'john@doe.com',         //Enter your email
      pass: 'Enter your password'   //Enter your password
    }
  });
  var mailOptions = {
    form: 'John Doe <john@doe.com>',
    to: 'john@doe.com',             //Enter your email
    subject: 'Website Submission',
    text: `You have a new submission with the following details ... \n
           Name: ${req.body.name} \n
           Email: ${req.body.email} \n
           Password: ${req.body.password} \n
           Message: ${req.body.message}
           `,
   html: `<p>You got a new submission with the following details...</p>
          <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Password: ${req.body.password}</li>
            <li>Message: ${req.body.message}</li>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(`Trying to send: \n ${mailOptions.html} \n but following error occur \n`);
      console.log(error);
      res.redirect('/');
    }else {
      console.log(`Message Sent {info.response}`);
      res.redirect('/')
    }
  })
});
module.exports = router;
