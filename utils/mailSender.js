var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://walkinshub1%40gmail.com:Chinna@*27@smtp.gmail.com');

function sendMail(toEmail, url) {
  var mailOptions = {
    from: '"Walkinshub" <walkinshub1@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: 'Please verify your account', // Subject line
    text: 'Please complete your registration.', // plaintext body
    html: url // html body
};

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

module.exports.sendMail = sendMail;
