'use strict';

const Router = require('koa-router');
const parser = require('koa-body');

const Users = require('../models/users');

const parsers = {
  query: parser({urlencoded: true, multipart: false, json: false}),
  form: parser({urlencoded: false, multipart: true, json: false}),
  json: parser({urlencoded: false, multipart: false, json: true}),
};

const users = new Router();

users.get('/', async ctx => {
  ctx.body = await Users.query();
});

users.post('/', parsers.json, async ctx => {
  try{ctx.body = await Users.query()
    .insert(ctx.request.body)
    .returning('*')}
  catch(err){
      ctx.status = 400;
      ctx.body = ("Didn't Work")
    }
});

users.get('/:id', async ctx => {
  ctx.body = await Users.query().findById(ctx.params.id);
});

users.patch('/:id', parsers.json, async (ctx, next) => {
  ctx.body = await Users.query()
    .findById(ctx.params.id)
    .patch({ activeP: true })
});

module.exports = users;
