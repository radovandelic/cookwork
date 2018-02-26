import nodemailer from 'nodemailer'
import { transportOptions } from '../../config'
import randtoken from 'rand-token'


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(
    transportOptions
);

export const sendVerificationMail = (email, id, token) => {

    //generate random token
    let url = 'http://cookwork.ml/verifyaccount/' + id + "/" + token;

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Cookwork Account Verification" <noreply@cookwork.ml>', // sender address
        to: email, // list of receivers
        subject: 'Please verify your Cookwork account ✔', // Subject line
        text: 'Please confirm your account', // plain text body
        html: `Please confirm your account by clicking the following link: <a href="${url}">link</a>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        // Preview only available when sending through an Ethereal account
        //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
}

