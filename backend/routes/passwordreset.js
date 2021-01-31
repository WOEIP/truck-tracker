'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const config = require('../config');
const knex = require('knex');
const PwResets = require('../models/pwresets');

//TODO parsers?
const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const passwordReset = new Router();

passwordReset.get('/', async ctx => {
    ctx.body = await PwResets.query();
});

passwordReset.post('/', parsers.json, async ctx => {
    let entryToInsert = ctx.request.body;
    let resetToken = crypto.randomBytes(128).toString('hex');
    const salt = config.secrets.get('salt');
    entryToInsert.resetHash = bcrypt.hashSync(resetToken, salt);
    ctx.body = await PwResets.query()
        .insert(entryToInsert)
        .returning('*');

    let transporter = nodemailer.createTransport({
        host: config.exposed.get('email.smtp_host'),
        port: config.exposed.get('email.smtp_port'),
        secure: true,
        auth: {
            user: config.exposed.get('email.noreply_email'),
            pass: config.secrets.get('dreamhost_smtp_password')
        }
    });

    let resetLink = 'https://trucktracker.net/#passwordresetlanding?token=' + resetToken;

    let htmlBody =
        '<p>You requested a password reset for your Truck Tracker account. To confirm your request, please click on the link below, or copy and paste the entire link into your browser.</p>' +
        '<p>' +
        '<a href="' + resetLink + '">' + resetLink + '</a>' +
        '<\p>'+
        '<p>Please note that this confirmation link expires in 24 hours and may require your immediate attention if you wish to access your online account in the future.</p>' +
        '<p><strong>/>PLEASE DO NOT REPLY TO THIS MESSAGE</strong></p>';

    let info = await transporter.sendMail({
        from: config.exposed.get('email.noreply_email'),
        to: ctx.request.body.requesterEmail,
        subject: "Truck Tracker password reset",
        text: "",
        html: htmlBody
    });

    console.log("Message sent: %s", info.messageId);
});

passwordReset.get('/:id', async ctx => {
    ctx.body = await PwResets.query().findById(ctx.params.id);
});

module.exports = passwordReset;
