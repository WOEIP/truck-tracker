'use strict';

const _ = require('lodash');
const moment = require('moment');

const {BaseModel} = require('.');

const ONE_DAY = 60 * 24; // 60 minute/hour * 24 hour/day
const UNIX_EPOCH_MAX = 2147483647; // 2^31 - 1

class PasswordReset extends BaseModel {
  static get tableName() {
    return 'pw_reset';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        requesterId: {type: 'string', format: 'uuid'},
        requesterEmail: {type: 'string'},
        resetHash: {type: 'string'},
        isDone: {type: 'boolean'},
        requestedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
      },
    };
  }

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
    formatted.timestamp = moment.unix(json.timestamp);
    formatted.created_at = moment.unix(json.created_at);
    formatted.updated_at = moment.unix(json.updated_at);
    /* eslint-enable */

    return formatted;
  }

  $parseDatabaseJson(json) {
    json = super.$parseDatabaseJson(json);

    const formatted = _.pick(json, [
      'requesterId',
      'requesterEmail',
      'resetHash',
      'isDone']);

    formatted.timestamp = moment(json.timestamp).unix();
    formatted.createdAt = moment(json.createdAt).unix();
    formatted.updatedAt = moment(json.updatedAt).unix();

    return formatted;
  }
}

module.exports = Users;
