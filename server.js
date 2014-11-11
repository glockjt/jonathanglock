var express = require('express')
  , path = require('path')
  , nodemailer = require('nodemailer')
  , config = require('./config')
  , app = express();

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(__dirname));
});

// Contact Form email setup
var smtpTranport = nodemailer.createTransport("SMTP", config.mail);

// Send email
app.post('/contact', function(req, res) {
    // console.log('email: ', req.body);
    // res.send({ status: 'sent', html: 'Thank you!' });
    // url check
    var urlRegExp = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/);

    var contactMessage = req.body.message;
    var urlCheck = urlRegExp.test(contactMessage);

    if(!urlCheck) {
        var mailOptions = {
            from: req.body.name + " " + req.body.email, // Sender name and email
            to: "webmaster@jonathanglock.com", // list of receivers
            subject: "JonathanGlock.com Contact Form Request - " + req.body.subject, // Subject line
            text: req.body.message // sender's message
        }

        smtpTranport.sendMail(mailOptions, function(err, mail) {
            if(err) {
                console.log('SMTP send mail error: ', err);
            } else {
                console.log('Message sent: ', mail.message);
                res.send({ status: 'sent', html: 'Thank you!' });
            }
        });
    } else {
        res.send({status: 'error'});
    }
});

// Run server
app.listen(app.get('port'), function() {
    console.log("Server listening on port: " + app.get('port'));
});