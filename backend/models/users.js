'use strict';

const _ = require('lodash');
const moment = require('moment');

const {TRUCK_TYPES} = require('../lib/constants');
const {BaseModel} = require('.');

const UNIX_EPOCH_MAX = 2147483647; // 2^31 - 1

/**
 * This is the Objection model for the table
 * Useful overview: https://vincit.github.io/objection.js/api/model/overview.html#model-data-lifecycle
 **/
class Users extends BaseModel {
    static get tableName() {
        return 'users';
    }

    /**
     * Every time a model instance is created, it's validated agains the jsonSchema.
     * https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
     **/
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'pwHash'],
            properties: {
                username: {type: 'string'},
                firstName: {type: 'string'},
                lastName: {type: 'string'},
                email: {type: 'string'},
                isLocalResident: {type: 'boolean'},
                isVerified: {type: 'boolean'},
                pwHash:{ type: 'string'},
                pwSalt: {type: 'string'},
                pwAlgoritm: {type: 'string'},
                isAdmin: {type: 'boolean'},
                dateRegistered: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
                lastLogin: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
            },
        };
    }

    /**
     *  This is called when a model is converted to database format.
     *  https://vincit.github.io/objection.js/api/model/instance-methods.html#formatdatabasejson
     **/
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);

        /* eslint-disable camelcase */
        const formatted = _.pick(json, [
            'username',
            'first_name',
            'last_name',
            'email',
            'local_resident_p',
            'is_verified',
            'pw_hash',
            'pw_salt',
            'pw_algorithm',
            'is_admin',
        ]);

        // convert unix timestamps into ISO 8601 strings for postgres
        formatted.date_registered = moment.unix(json.date_registered);
        formatted.last_login = moment.unix(json.last_login);
        /* eslint-enable */

        return formatted;
    }

    /**
     *  This is called when a model instance is created from a database JSON object.
     *  https://vincit.github.io/objection.js/api/model/instance-methods.html#parsedatabasejson
     **/
    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        const formatted = _.pick(json, [
            'id',
            'username',
            'firstName',
            'lastName',
            'email',
            'isLocalResident',
            'isVerified',
            'pwHash',
            'pwSalt',
            'pwAlgoritm',
            'isAdmin']);

        formatted.dateRegistered = moment(json.dateRegistered).unix();
        formatted.lastLogin = moment(json.lastLogin).unix();

        return formatted;
    }
}

module.exports = Users;
