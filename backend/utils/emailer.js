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
    let subject = 'Thank you for helping Truck Tracker!';

    let htmlBody =
        '<p>Somebody recently have made an account on trucktracker.net with your email address. To confirm that it was you and verify your address, please click the below link to log in: </p>' +
        '<p>' +
        '<a href="' + confirmationLink + '">Confirm email</a>' +
        '<\p>';

    sendEmail(toEmail, subject, htmlBody);
}

Emailer.sendPasswordResetLink = (toEmail, resetLink) => {
    let subject = "Truck Tracker password reset";

    let htmlBody =
        '<p>You requested a password reset for your Truck Tracker account. To confirm your request, please click on the link below, or copy and paste the entire link into your browser.</p>' +
        '<p>' +
        '<a href="' + resetLink + '">Password reset</a>' +
        '<\p>'+
        '<p>Please note that this link expires in 24 hours and may require your immediate attention if you wish to access your online account in the future.</p>';

    sendEmail(toEmail, subject, htmlBody);
}

module.exports = Emailer;
