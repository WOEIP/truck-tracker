'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
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
   let entryToInsert = ctx.request.body;
   let resetToken = crypto.randomBytes(128).toString('hex');
   // TODO secret salt
   const salt = '$2a$10$arjAldmQvHFfmUeL1/GCm.';
   entryToInsert.resetHash = bcrypt.hashSync(resetToken, salt);
   ctx.body = await PasswordReset.query()
   .insert(entryToInsert)
   .returning('*');

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  // let info = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //   to: "bar@example.com, baz@example.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
});

passwordReset.get('/:id', async ctx => {
  ctx.body = await PasswordReset.query().findById(ctx.params.id);
});

module.exports = passwordReset;
