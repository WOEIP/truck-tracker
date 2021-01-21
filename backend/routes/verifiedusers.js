'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const Users = require('../models/users');

const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const verifiedUsers = new Router();

verifiedUsers.get('/', async ctx => {
   let response = {};
    try {
        let verifiedUsers = await Users.query()
            .select('id')
            .where('is_verified', true)

        let data = {
            verifiedIds: idHash(verifiedUsers)
        }
        response.status = 'success';
        response.data = data
        ctx.body = JSON.stringify(response);
    }
    catch(err){
        console.error(err);
        response.status = "error";
        response.errorText = 'Could not fetch verified IDs';
        response.originalError = err;
        ctx.status = 400;
        ctx.body = JSON.stringify(response);
    }
});

function idHash(users){
    let result = {}

    for(let i=0; i < users.length; i++){
        result[users[i].id] = true
    }

    return result;
}

module.exports = verifiedUsers;
