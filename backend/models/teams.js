'use strict';

const _ = require('lodash');

const {BaseModel} = require('.');

/**
 * This is the Objection model for the table
 * Useful overview: https://vincit.github.io/objection.js/api/model/overview.html#model-data-lifecycle
 **/
class Teams extends BaseModel {
    static get tableName() {
        return 'teams';
    }

    /**
     * Every time a model instance is created, it's validated agains the jsonSchema.
     * https://vincit.github.io/objection.js/api/model/static-properties.html#static-jsonschema
     **/
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['teamName'],
            properties: {
                teamName: {type: 'string'},
                askForDotNumber: {type: 'boolean'},
                askForPhotoUpload: {type: 'boolean'},
                allowParkingTruck: {type: 'boolean'},
                allowIdlingTruck: {type: 'boolean'},
                allowMovingTruck: {type: 'boolean'},
                allowMovingTruckSingleClick: {type: 'boolean'},
                askForTime: {type: 'boolean'},
                allowACBUS: {type: 'boolean'},
                allow2AXLE: {type: 'boolean'},
                allowBOBTAIL: {type: 'boolean'},
                allow3AXLE: {type: 'boolean'},
                allow4AXLE: {type: 'boolean'},
                allow5AXLE: {type: 'boolean'},
                allow6AXLE: {type: 'boolean'},
                allowPORTCHASSIS: {type: 'boolean'},
                allowPORTCONTAINER: {type: 'boolean'},
                allowBOXTRUCK: {type: 'boolean'}
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
            'team_name',
            'ask_for_dot_number',
            'ask_for_photo_upload',
            'allow_parking_truck',
            'allow_idling_truck',
            'allow_moving_truck',
            'allow_moving_truck_single_click',
            'ask_for_time',
            'allow_2_AXLE',
            'allow_BOBTAIL',
            'allow_3_AXLE',
            'allow_4_AXLE',
            'allow_5_AXLE',
            'allow_6_AXLE',
            'allow_PORT_CHASSIS',
            'allow_PORT_CONTAINER',
            'allow_BOX_TRUCK'
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
            'teamName',
            'askForDotNumber',
            'askForPhotoUpload',
            'allowParkingTruck',
            'allowIdlingTruck',
            'allowMovingTruck',
            'allowMovingTruckSingleClick',
            'askForTime',
            'allow2AXLE',
            'allowBOBTAIL',
            'allow3AXLE',
            'allow4AXLE',
            'allow5AXLE',
            'allow6AXLE',
            'allowPORTCHASSIS',
            'allowPORTCONTAINER',
            'allowBOX_TRUCK'
        ]);

        return formatted;
    }
}

module.exports = Teams;
