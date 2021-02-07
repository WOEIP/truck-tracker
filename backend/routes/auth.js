'use strict';
const Router = require('koa-router');
const bcrypt = require('bcryptjs');
const config = require('../config');
const parser = require('koa-body');
const passport = require('koa-passport');
const EmailConfirmations = require('../models/email-confirmations');
const Users = require('../models/users');
const DbUtils = require('../utils/db');

const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const auth = new Router();

auth.get('/', parsers.json, async ctx => {
    ctx.body = { loggedIn: ctx.isAuthenticated() };
});

auth.post('/login', parsers.json, async ctx => {
    return passport.authenticate('local', async (err, user, info, status) => {
        let response = {};
        if (user) {
            let emailVerified = await checkEmailVerification(user, ctx.request.body.confirmationToken);
            if (emailVerified) {
                DbUtils.patchById(Users, user.id, {isEmailVerified: true});

                ctx.login(user);
                ctx.status = 200;
                let data = {
                    username: user.username,
                    isAdmin: user.is_admin,
                    id: user.id
                }
                response.status = 'success';
                response.data = data;
            } else {
                ctx.status = 400;
                response.status = 'error';
                response.errorCode = 'err_email_not_verified';
            }
        } else {
            ctx.status = 400;
            response.status = 'error';
            response.errorCode = 'err_user_not_found';
        }
        ctx.body = JSON.stringify(response);
    })(ctx);
});

auth.post('/logout', parsers.json, async ctx => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.status = 200;
        ctx.body = 'Logout successful';
    } else {
        ctx.body = { success: false };
        ctx.throw(401);
    }
});

const checkEmailVerification = async (userData, emailConfirmationToken) => {
    if (userData.is_email_verified) { return true; }

    let user = await Users.query().findById(userData.id);
    if (!user) { return false; };

    let emailConfirmationRecord = await EmailConfirmations.query()
        .select('email_confirmations.*')
        .where('requester_id', user.id);
    if (!emailConfirmationRecord.length) { return false; };

    const salt = config.secrets.get('salt');
    let receivedHash = await bcrypt.hash(confirmationToken, salt);

    return receivedHash === emailConfirmationRecord[0].confirmationHash;
}

module.exports = auth;
