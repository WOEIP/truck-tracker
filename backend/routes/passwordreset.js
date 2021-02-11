'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const bcrypt = require('bcryptjs');
const config = require('../config');
const crypto = require('crypto');
const knex = require('knex');
const DbUtils = require('../utils/db');
const Emailer = require('../utils/emailer.js');
const PwResets = require('../models/pw-resets');
const Users = require('../models/users');

//TODO parsers?
const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const passwordReset = new Router();

passwordReset.post('/', parsers.json, async ctx => {
    let response = {};
    let userArray = await Users.query()
        .select('users.*')
        .where('email', ctx.request.body.email);

    if (userArray.length) {
        let user = userArray[0];
        let aDayFromNow = new Date();
        aDayFromNow.setDate(aDayFromNow.getDate() + 1);

        let entryToInsert = {
            requesterId: user.id,
            requesterEmail: ctx.request.body.email,
            expirationTime: aDayFromNow.getTime() / 1000, // unix epoch
        };

        let resetToken = crypto.randomBytes(128).toString('hex');
        const salt = config.secrets.get('salt');
        entryToInsert.resetHash = bcrypt.hashSync(resetToken, salt);

        ctx.body = await PwResets.query()
            .insert(entryToInsert)
            .returning('*'); // TODO probably not needed

        let resetLink = 'https://trucktracker.net/?token=' + resetToken + '#passwordresetlanding';

        Emailer.sendPasswordResetLink(ctx.request.body.email, resetLink);
        response.status = 'success';
    } else {
        ctx.status = 400;
        response.status = 'error';
        response.errorCode = 'err_email_not_found';
    }
    ctx.body = JSON.stringify(response);
});

passwordReset.post('/execute', parsers.json, async ctx => {
    let response = {};
        let now = new Date();
            console.error(now);
            console.error(ctx.request.body);
            console.error(ctx.request.body.resetToken);
    let pwReset = await checkPasswordResetToken(ctx.request.body.resetToken);
    if (pwReset) {
        let saltRounds = 10;
        let newSalt = bcrypt.genSaltSync(saltRounds);
        let newPwHash = bcrypt.hashSync(ctx.request.body.password, newSalt);
        DbUtils.patchById(Users, pwReset.requesterId, {pwSalt: newSalt, pwHash: newPwHash});
        DbUtils.patchById(PwResets, pwReset.id, {isDone: true});
    } else {
        ctx.status = 400;
        response.status = 'error';
        response.errorCode = 'err_password_reset_error';
    }
    ctx.body = JSON.stringify(response);
});

const checkPasswordResetToken = async (resetToken) => {
    const salt = config.secrets.get('salt');
    let hashedToken = bcrypt.hashSync(resetToken, salt);

    let pwResetArray = await PwResets.query()
        .select('pw_resets.*')
        .where('reset_hash', hashedToken);

    if (!pwResetArray.length ||
        pwResetArray[0].isDone ||
        pwResetArray[0].expirationTime === -1) { // TODO
        return false;
    }
    return pwResetArray[0];
}

module.exports = passwordReset;
