'use strict';

const path = require('path');
const convict = require('convict');
const fs = require('fs');

var appEnvironment = fs.readFileSync(__dirname + '/app-environment', 'utf8').trim();
if (appEnvironment !== 'development' && appEnvironment !== 'production') {
    console.error('No config env file found!');
}

const exposed = convict({
    port: {
        format: 'port',
        default: -1,
    },
    database: {
        host: {
            format: String,
            default: null,
        },
        port: {
            format: 'port',
            default: null,
        },
        user: {
            format: String,
            default: null,
        },
        database: {
            format: String,
            default: null,
        }
    },
    email: {
        smtp_host: {
            format: String,
            default: null,
        },
        smtp_port: {
            format: 'port',
            default: null,
        },
        noreply_email: {
            format: String,
            default: null,
        }
    }
});

const secrets = convict({
    database: {
        password: {
            format: String,
            default: null,
        }
    },
    salt: {
        format: String,
        default: null,
    },
    dreamhost_smtp_password: {
        format: String,
        default: null,
    },
    koa_session_key: {
        format: String,
        default: null,
    }
})

if (appEnvironment === 'production') {
    exposed.loadFile(path.resolve(__dirname, 'prod_exposed.json'));
    secrets.loadFile(path.resolve(__dirname, 'prod_secrets.json'));
} else {
    exposed.loadFile(path.resolve(__dirname, 'dev_exposed.json'));
    secrets.loadFile(path.resolve(__dirname, 'dev_secrets.json'));
}


exposed.validate({allowed: 'strict'});
secrets.validate({allowed: 'strict'});

const config = {
    exposed: exposed,
    secrets: secrets
}

module.exports = config;
