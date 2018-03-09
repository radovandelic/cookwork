import nodemailer from 'nodemailer'
import { transportOptions, supportEmail } from '../../config'
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
        from: '"Cookwork Account Verification" <noreply@cookwork.eu>', // sender address
        to: email, // list of receivers
        subject: 'Please verify your Cookwork account ✔', // Subject line
        text: 'Please confirm your account', // plain text body
        html: `Please confirm your account by clicking the following link: <a href="${url}">link</a>` // html body
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(Error(err))
            else resolve(info)
        });
    })
}

export const sendEnquiryMail = (from, message) => {
    message += "\n\n\n"
        + "___________________________________" + "\n"
        + "Message sent from the cookwork.eu platform.\n"
        + `enquirer's email: <${from}>`

    let html = message.replace(/\n/g, "<br/>")

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Cookwork Enquiry" <noreply@cookwork.eu>', // sender address
        to: supportEmail, // list of receivers
        subject: `You have a new enquiry from <${from}> `, // Subject line
        text: message, // plain text body
        html: html // html body
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(Error(err))
            else resolve(info)
        });
    })
}

