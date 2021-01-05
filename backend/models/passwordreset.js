'use strict';

const _ = require('lodash');
const moment = require('moment');

const {BaseModel} = require('.');

const ONE_DAY = 60 * 24; // 60 minute/hour * 24 hour/day
const UNIX_EPOCH_MAX = 2147483647; // 2^31 - 1

/**
 * This is the Objection model for the table
 * Useful overview: https://vincit.github.io/objection.js/api/model/overview.html#model-data-lifecycle
**/
class PasswordReset extends BaseModel {
  static get tableName() {
    return 'pw_resets';
  }

  /**
   * Every time a model instance is created, it's validated agains the jsonSchema.
   * https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
   **/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['requesterEmail'],
      properties: {
        requesterId: {type: 'string', format: 'uuid'},
        requesterEmail: {type: 'string'},
        resetHash: {type: 'string'},
        isDone: {type: 'boolean'},
        requestedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
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
      'requester_id',
      'requester_email',
      'reset_hash',
      'is_done',
    ]);

    // convert unix timestamps into ISO 8601 strings for postgres
    formatted.requested_at = moment.unix(json.requested_at);
    formatted.created_at = moment.unix(json.created_at);
    formatted.updated_at = moment.unix(json.updated_at);
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
      'requesterId',
      'requesterEmail',
      'resetHash',
      'isDone']);

    formatted.requestedAt = moment(json.requestedAt).unix();
    formatted.createdAt = moment(json.createdAt).unix();
    formatted.updatedAt = moment(json.updatedAt).unix();

    return formatted;
  }
}

module.exports = PasswordReset;
