/**
 * Junction table to keep track which user is in which team
 **/

'use strict';

const _ = require('lodash');

const {BaseModel} = require('.');

/**
 * This is the Objection model for the table
 * Useful overview: https://vincit.github.io/objection.js/api/model/overview.html#model-data-lifecycle
 **/
class TeamsUsers extends BaseModel {
    static get tableName() {
        return 'teams_users';
    }

    /**
     * Every time a model instance is created, it's validated agains the jsonSchema.
     * https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
     **/
    static get jsonSchema() {
        return {
            type: 'object',
            required: [],
            properties: {
                userId: {type: 'string', format: 'uuid'},
                teamId: {type: 'string', format: 'uuid'},
                isTeamAdmin: {type: 'boolean'}
            }
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
            'user_id',
            'team_id',
            'is_team_admin'
        ]);

        return formatted;
    }

    /**
     *  This is called when a model instance is created from a database JSON object.
     *  https://vincit.github.io/objection.js/api/model/instance-methods.html#parsedatabasejson
     **/
    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson(json);

        const formatted = _.pick(json, [
            'userId',
            'teamId',
            'isTeamAdmin'
        ]);

        return formatted;
    }
}

module.exports = TeamsUsers;
