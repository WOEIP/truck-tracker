'use strict';

const Router = require('koa-router');
const parser = require('koa-body');
const Teams = require('../models/teams');

const parsers = {
    query: parser({urlencoded: true, multipart: false, json: false}),
    form: parser({urlencoded: false, multipart: true, json: false}),
    json: parser({urlencoded: false, multipart: false, json: true}),
};

const teams = new Router();

teams.post('/', parsers.json, async ctx => {
    // This is rough code, will need to be refined once
    // we use teams to full effect.
    let teamToInsert = {
        teamName: ctx.request.body.teamName || 'Default Team',
        askForDotNumber: ctx.request.body.askForDotNumber || true,
        askForPhotoUpload: ctx.request.body.askForPhotoUpload || true,
        allowParkingTruck: ctx.request.body.allowParkingTruck || true,
        allowIdlingTruck: ctx.request.body.allowIdlingTruck || true,
        allowMovingTruck: ctx.request.body.allowMovingTruck || true,
        allowMovingTruckSingleClick: ctx.request.body.allowMovingTruckSingleClick || false,
        askForTime: ctx.request.body.askForTime || true,
        allowACBUS: ctx.request.body.allowACBUS || true,
        allow2AXLE: ctx.request.body.allow2AXLE || true,
        allowBOBTAIL: ctx.request.body.allowBOBTAIL || true,
        allow3AXLE: ctx.request.body.allow3AXLE || true,
        allow4AXLE: ctx.request.body.allow4AXLE || true,
        allow5AXLE: ctx.request.body.allow5AXLE || true,
        allow6AXLE: ctx.request.body.allow6AXLE || true,
        allowPORTCHASSIS: ctx.request.body.allowPORTCHASSIS || true,
        allowPORTCONTAINER: ctx.request.body.allowPORTCONTAINER || true,
        allowBOXTRUCK: ctx.request.body.allowBOXTRUCK || true
    };

    let response = {};

    await Teams.query()
        .insert(teamToInsert)
        .returning('*'); // TODO probably not needed

    response.status = 'success';
    ctx.body = JSON.stringify(response);
});

teams.get('/:id', parsers.json, async (ctx) => {
    ctx.body = await Teams.query().findById(ctx.params.id);
});

module.exports = teams;
