'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const Users = require('../models/users');

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
    ctx.body = await Users.query();
});

users.post('/', parsers.json, async ctx => {
    let newUser = createUser(ctx.request.body);
    let response = {};
    try {
        let insertedUsername = await Users.query()
            .insert(newUser)
            .returning('username');
        response.result = 'success';
        response.username = insertedUsername;
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
    ctx.body = await Users.query().findById(ctx.params.id);
});

users.patch('/:id', parsers.json, async (ctx) => {
    let response = {}
    try{
        let targetUser = await Users.query()
        .findById(ctx.params.id)

        //currently, we have to have dateRegistered and lastLogin in patch request or it won't work
        let patchedPayload = Object.assign(ctx.request.body, {dateRegistered: targetUser.dateRegistered, lastLogin: 0})

        //actual patch request
        await Users.query()
        .patch(patchedPayload)
        .findById(ctx.params.id)

        response.result = 'success';
        ctx.body = JSON.stringify(response);
    }
    catch (err){
        response.result = 'error';
        response.error = err
        ctx.status = 400;
        ctx.body = JSON.stringify(response);
    }
});

// users.get('/verifiedusers', parsers.json, async ctx => {
//     ctx.body = "received request!!!"
//     // let response = {};
//     // try {
//     //     let verifiedIds = await Users.query()
//     //         .where('isVerified', true)
//     //         .returning('id')
//     //     response.result = 'success';
//     //     response.verifiedIds = verifiedIds
//     //     ctx.body = JSON.stringify(response);
//     // }
//     // catch(err){
//     //     console.error(err);
//     //     response.result = 'error';
//     //     response.error = 'Could not fetch verified IDs';
//     //     ctx.status = 400;
//     //     ctx.body = JSON.stringify(response);
//     // }
// });

function createUser (userParams) {
    let newUser = userParams;
    let saltRounds = 10;
    newUser.pwSalt = bcrypt.genSaltSync(saltRounds);
    newUser.pwHash = bcrypt.hashSync(userParams.password, newUser.pwSalt);
    newUser.pwAlgorithm = 'bcrypt,' + saltRounds;
    newUser.isVerified = false;
    newUser.isAdmin = false;
    newUser.dateRegistered = Math.floor(Date.now() / 1000);
    newUser.lastLogin = 0; // We cannot leave it empty, because the ORM connector chokes on it.
    newUser.isLocalResident = LOCAL_RESIDENT_OPTIONS.unknown;
    return newUser;
}

module.exports = users;
