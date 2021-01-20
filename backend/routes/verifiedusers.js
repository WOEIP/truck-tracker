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
  ctx.body = "you hit the endpoint!"
});

module.exports = verifiedUsers;
