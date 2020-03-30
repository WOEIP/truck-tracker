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
  ctx.body = await Users.query()
    .insert(ctx.request.body)
    .returning('*');
});

users.get('/:id', async ctx => {
  ctx.body = await Users.query().findById(ctx.params.id);
});

users.patch('/:id', parsers.json, async (ctx, next) => {
  // TODO
  const { id } = ctx.params;

  const changedUser = await Users.query().patch(ctx.request.body).where({ id });
  if (!changedUser){
    ctx.throw(409, { data: { message: "Couldn't Update That User."} })
  }

  ctx.status = 200;

  // ctx.body = await Users.query()
  //   .where({ id: ctx.params.id })
  //   .update(ctx.request.body, ['id', 'active_p'])
});

module.exports = users;
