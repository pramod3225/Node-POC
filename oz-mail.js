


var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transport = nodemailer.createTransport(smtpTransport({
    //service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,//465,
    auth: {
            user: "noreply@organizatech.com",
            pass: "organiza@123"
        }
}));
/*var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply@organizatech.com',
        pass: '8H4=PmSr'
    }
});*/


transport.sendMail({
        from: "noreply@organizatech.com",
        to: "pramod.mishra@organizatech.com",
        cc: null,
        bcc: null,
        subject: "subjectData",
        html: "<div>This is test div</div>",
        text: "text"
    },
    function (err, responseStatus) {
        if (err)
            console.log(err);
        else
            console.log(responseStatus);
    });
