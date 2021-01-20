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
            .where('is_verified', true)
            .returning('id')
        response.result = 'success';
        response.verifiedIds = verifiedIds.id
        ctx.body = JSON.stringify(response);
    }
    catch(err){
        console.error(err);
        response.result = 'error';
        response.error = 'Could not fetch verified IDs';
        ctx.status = 400;
        ctx.body = JSON.stringify(response);
    }
});

module.exports = verifiedUsers;
