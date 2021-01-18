'use strict';

const _ = require('lodash');
const logger = require('./../lib/logger.js');
const moment = require('moment');

const {TRUCK_TYPES} = require('../lib/constants');
const {BaseModel} = require('.');

const ONE_DAY = 60 * 24; // minutes
const UNIX_EPOCH_MAX = 2147483647; // 2^31 - 1

/**
 * This is the Objection model for the table
 * Useful overview: https://vincit.github.io/objection.js/api/model/overview.html#model-data-lifecycle
 **/
class Reports extends BaseModel {
    static get tableName() {
        return 'reports';
    }

    /**
     * Every time a model instance is created, it's validated agains the jsonSchema.
     * https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
     **/
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['truckType',
                       'truckSeenAt',
                       'start',
                       'end',
                       'reporterId'],
            properties: {
                truckType: {enum: TRUCK_TYPES.values},
                truckSeenAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
                reporterId: {type: 'string', format: 'uuid'},
                reportedAt: {type: 'number', minimum: 0, maximum: UNIX_EPOCH_MAX},
                wasEngineRunning: {type: 'boolean'},
                wasTruckMoving: {type: 'boolean'},
                idlingDuration: {type: 'number', minimum: 0, maximum: ONE_DAY},
                start: {
                    required: ['lat', 'lon'],
                    lat: {type: 'number', minimum: -90, maximum: 90},
                    lon: {type: 'number', minimum: -180, maximum: 180},
                },
                end: {
                    required: ['lat', 'lon'],
                    lat: {type: 'number', minimum: -90, maximum: 90},
                    lon: {type: 'number', minimum: -180, maximum: 180},
                },
                licensePlate: {type: 'string'},
                transportCompanyName:  {type: 'string'},
                dotNumber:  {type: 'string'},
                photoUrl:  {type: 'string'},
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
            'truck_type',
            'reporter_id',
            'was_engine_running',
            'was_truck_moving',
            'idling_duration_mins',
            'license_plate',
            'transport_company_name',
            'dot_number',
            'photo_url'
        ]);
        formatted.start_lat = _.get(json, 'start.lat');
        formatted.start_lon = _.get(json, 'start.lon');
        formatted.end_lat = _.get(json, 'end.lat');
        formatted.end_lon = _.get(json, 'end.lon');

        formatted.truck_seen_at = moment.unix(json.truck_seen_at);
        formatted.reported_at = moment.unix(json.reported_at);

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
            'truckType',
            'reporterId',
            'wasEngineRunning',
            'wasTruckMoving',
            'idlingDurationMins',
            'licensePlate',
            'transportCompanyName',
            'dotNumber',
            'photoUrl']);
        formatted.start = {
            lat: parseFloat(json.startLat),
            lon: parseFloat(json.startLon),
        };
        formatted.end = {
            lat: parseFloat(json.endLat),
            lon: parseFloat(json.endLon),
        };
        formatted.truckSeenAt = moment(json.truckSeenAt).unix();
        formatted.reportedAt = moment(json.reportedAt).unix();

        return formatted;
    }
}

module.exports = Reports;
