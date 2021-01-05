'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const knex = require('knex');
const PasswordReset = require('../models/passwordreset');

//TODO parsers?
const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const passwordReset = new Router();

passwordReset.get('/', async ctx => {
  ctx.body = await PasswordReset.query();
});

passwordReset.post('/', parsers.json, async ctx => {
   var entryToInsert = ctx.request.body;
   entryToInsert.resetHash = 'dummyhashfornow';
   ctx.body = await PasswordReset.query()
   .insert(entryToInsert)
   .returning('*');
});

passwordReset.get('/:id', async ctx => {
  ctx.body = await PasswordReset.query().findById(ctx.params.id);
});

module.exports = passwordReset;
