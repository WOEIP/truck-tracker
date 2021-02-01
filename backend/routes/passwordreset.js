'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const bcrypt = require('bcryptjs');
const config = require('../config');
const crypto = require('crypto');
const knex = require('knex');
const Emailer = require('../lib/emailer.js');
const PwResets = require('../models/pw-resets');

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
        .returning('*'); // TODO probably not needed

    let resetLink = 'https://trucktracker.net/#passwordresetlanding?token=' + resetToken;

    Emailer.sendPasswordResetLink(ctx.request.body.requesterEmail, resetLink);
});

passwordReset.get('/:id', async ctx => {
    ctx.body = await PwResets.query().findById(ctx.params.id);
});

module.exports = passwordReset;
