'use strict';

const config = require('./config');

module.exports = {
  client: 'pg',
  debug: true,
  connection: {
    host: config.exposed.get('database.host'),
    port: config.exposed.get('database.port'),
    user: config.exposed.get('database.user'),
    password: config.secret.get('development_db_password'),
    database: config.exposed.get('database.dev_database'),
  },
};
