'use strict';

const config = require('../config');
const nodemailer = require("nodemailer");

let Emailer = {};

const sendEmail = async (toEmail, subject, htmlBody) => {
    let transporter = nodemailer.createTransport({
        host: config.exposed.get('email.smtp_host'),
        port: config.exposed.get('email.smtp_port'),
        secure: true,
        auth: {
            user: config.exposed.get('email.trucktracker_main_email'),
            pass: config.secrets.get('dreamhost_smtp_password')
        }
    });

    let info = await transporter.sendMail({
        from: config.exposed.get('email.trucktracker_main_email'),
        to: toEmail,
        subject: subject,
        text: "",
        html: htmlBody
    });

    console.log("Message sent: %s", info.messageId);
}

Emailer.relayUserContact = (name, email, message, inquiryType) => {
                               console.log(inquiryType);
    let subject = 'Truck Tracker user contact';

    // TODO make woeip.org relays for this so we can control messaging without changing the code.
    let toEmail = inquiryType === 'site-feedback'
        ? 'motching@gmail.com'
        : 'brian.woeip@gmail.com';

    let htmlBody =
        '<p>Message from a user: </p>' +
        '<p>name: ' + name + '</p>' +
        '<p>email: ' + email + '</p>' +
        '<p>message: ' + message + '</p>';

    sendEmail(toEmail, subject, htmlBody);
}

Emailer.sendEmailConfirmationLink = (toEmail, confirmationLink) => {
    let subject = 'Confirm your account';

    let htmlBody =
        '<p>Welcome to Truck Tracker!</p>' +
        '<p>To report truck activity in West Oakland, confirm your account by clicking the link below:</p>' +
        '<p>' +
        '<a href="' + confirmationLink + '">Confirm account</a>' +
        '<\p>' +
        '<p>If you didn’t create an account, you can ignore this email.</p>' +
        '<p>Thanks for using Truck Tracker, a project of the West Oakland Environmental Indicators Project.</p>';

    sendEmail(toEmail, subject, htmlBody);
}

Emailer.sendPasswordResetLink = (toEmail, resetLink) => {
    let subject = "Reset your Truck Tracker password";

    let htmlBody =
        '<p>We received a request to reset your password. You can reset your password by clicking the following link:</p>' +
        '<p>' +
        '<a href="' + resetLink + '">Password your reset</a>' +
        '<\p>'+
        '<p><b>This link expires in 24 hours.</b> If you didn’t make this request, don’t worry; you can simply ignore this email and nothing will change.</p>' +
        '<p>Have a great day,<br/>The Truck Tracker team</p>';

    sendEmail(toEmail, subject, htmlBody);
}

module.exports = Emailer;
