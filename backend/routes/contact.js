'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const passport = require('koa-passport');
const Emailer = require('../utils/emailer.js');

const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const contact = new Router();

contact.post('/', parsers.json, async ctx => {
    let response = {};
    try {
        Emailer.relayUserContact(
            ctx.request.body.name,
            ctx.request.body.email,
            ctx.request.body.message,
            ctx.request.body.inquiryType
        );
        response.result = 'success';
        ctx.body = JSON.stringify(response);
    }
    catch(err){
        console.error(err);
        response.result = 'error';
        response.error = 'Generic error at message sending';
        ctx.status = 400;
        ctx.body = JSON.stringify(response);
    }
});

module.exports = contact;
