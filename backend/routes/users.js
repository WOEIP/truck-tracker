'use strict';

const _ = require('lodash');

const Router = require('koa-router');
const parser = require('koa-body');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const config = require('../config');
const crypto = require('crypto');
const DbUtils = require('../utils/db');
const Emailer = require('../utils/emailer.js');

const Users = require('../models/users');
const TeamsUsers = require('../models/teams-users');
const EmailConfirmations = require('../models/email-confirmations');

const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const users = new Router();

const LOCAL_RESIDENT_OPTIONS = {
    yes: 'yes',
    no: 'no',
    unknown: 'unknown'
}

users.get('/', async ctx => {
    if (ctx.isAuthenticated()){
        ctx.body = await Users.query().select('username', 'is_verified', 'id')
    }
});

users.post('/', parsers.json, async ctx => {
    let newUser = createUser(ctx.request.body);
    let response = {};
    try {
        let insertedUser = await Users.query().insert(newUser);

        let confirmationToken = crypto.randomBytes(128).toString('hex');
        const salt = config.secrets.get('salt');

        let entryToInsert = {
            requesterId: insertedUser.id,
            requesterEmail: ctx.request.body.email,
            confirmationHash: bcrypt.hashSync(confirmationToken, salt),
            isDone: false,
            expirationTime: 0 // Not checking for now
        };

        ctx.body = await EmailConfirmations.query()
            .insert(entryToInsert)
            .returning('*'); // TODO probably not needed

        let confirmationLink = 'https://trucktracker.net/?username=' +
            insertedUser.username +
            '&token=' +
            confirmationToken +
            '#login';

        Emailer.sendEmailConfirmationLink(ctx.request.body.email, confirmationLink);

        response.result = 'success';
        response.username = insertedUser.username;
        ctx.body = JSON.stringify(response);
    }
    catch(err){
        console.error(err);
        response.result = 'error';
        response.error = 'Generic error at user creation';
        ctx.status = 400;
        ctx.body = JSON.stringify(response);
    }
});

users.get('/:id', async ctx => {
    let user = await Users.query().findById(ctx.params.id);
    let teamsRecords = await TeamsUsers
        .select('teams_users')
        .where('user_id', ctx.params.id);
    let teamsForUser = teamsRecords.map(record => record.team_id);
    user.teamsForUser = teamsForUser;
    ctx.body = user;
});

users.patch('/:id', parsers.json, async (ctx) => {
    let response = {}
    try{
        DbUtils.patchById(Users, ctx.params.id, ctx.request.body);

        response.status = 'User object successfully modified'
        ctx.body = JSON.stringify(response);
    }
    catch (err){
        response.status = 'error'
        response.errorText = 'Could not modify user object';
        response.originalError = err
        ctx.status = 400;
        ctx.status = 200;
        ctx.body = JSON.stringify(response);
    }
});

const createUser = userParams => {
    let newUser = userParams;
    let saltRounds = 10;
    newUser.pwSalt = bcrypt.genSaltSync(saltRounds);
    newUser.pwHash = bcrypt.hashSync(userParams.password, newUser.pwSalt);
    newUser.pwAlgorithm = 'bcrypt,' + saltRounds;
    newUser.isVerified = false;
    newUser.isEmailVerified = false;
    newUser.isAdmin = false;
    newUser.dateRegistered = Math.floor(Date.now() / 1000);
    newUser.lastLogin = 0; // We cannot leave it empty, because the ORM connector chokes on it.
    newUser.isLocalResident = LOCAL_RESIDENT_OPTIONS.unknown;
    return newUser;
}

module.exports = users;
