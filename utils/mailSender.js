var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://walkinshubindia%40gmail.com:Chinna@*27@smtp.gmail.com');

function sendMail(toEmail, html) {
  var mailOptions = {
    from: '"www.walkinshub.com" <walkinshubindia@gmail.com>', // sender address
    to: toEmail, // list of receivers
    subject: 'Walkins list for today', // Subject line
    text: 'Hello, Please find below list of job walkins that are posted today', // plaintext body
    html: html // html body
};

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}

module.exports.sendMail = sendMail;
