'use strict';

const path = require('path');
const convict = require('convict');

const exposed = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'production',
    env: 'NODE_ENV',
    arg: 'env',
  },
  port: {
    doc: 'The port for the http server to listen on.',
    format: 'port',
    default: -1,
    env: 'PORT',
    arg: 'port',
  },
  database: {
    host: {
      doc: 'hostname for the database server',
      format: String,
      default: null,
      env: 'PGHOST',
    },
    port: {
      doc: 'port for the database server',
      format: 'port',
      default: null,
      env: 'PGPORT',
    },
    user: {
      doc: 'user to connect to database server as',
      format: String,
      default: null,
      env: 'PGUSER',
    },
    dev_database: {
      doc: 'name of the database to use on the database server',
      format: String,
      default: null,
      env: 'PGDATABASE',
    },
    prod_database: {
      doc: 'name of the database to use on the database server',
      format: String,
      default: null,
      env: 'PGDATABASE',
    }
  },
  email: {
    smtp_host: {
      doc: 'SMTP host',
      format: String,
      default: null,
      env: 'SMTP_HOST',
    },
    smtp_port: {
      doc: 'SMTP port',
      format: 'port',
      default: null,
      env: 'SMTP_PORT',
    },
    noreply_email: {
      doc: 'Outbound email address',
      format: String,
      default: null,
      env: 'NOREPLY_EMAIL',
    }
  }
});

const secrets = convict({
    development_db_password: {
        doc: 'dev postgres PW',
        format: String,
        default: null,
        env: 'DEV_DB_PW',
    },
    production_db_password: {
        doc: 'prod postgres PW',
        format: String,
        default: null,
        env: 'PROD_DB_PW',
    },
    dreamhost_smtp_password: {
        doc: 'For sending emails',
        format: String,
        default: null,
        env: 'EMAIL_PW',
    },
    koa_session_key: {
        doc: 'Session cookie key',
        format: String,
        default: null,
        env: 'KOA_SESSION_KEY',
    }
})

exposed.loadFile(path.resolve(__dirname, 'exposed.json'));
secrets.loadFile(path.resolve(__dirname, 'secrets.json'));

exposed.validate({allowed: 'strict'});
secrets.validate({allowed: 'strict'});

const config = {
    exposed: exposed,
    secrets: secrets
}

module.exports = config;
