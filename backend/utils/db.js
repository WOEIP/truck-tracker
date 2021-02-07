'use strict';

const _ = require('lodash');

let  DbUtils = {};

/**
 * @param {Object} tableModel - Objection model
 * @param {Uuid} id
 * @param {Object} updateObject
 * @returns {Promise}
 */
DbUtils.patchById = async (tableModel, id, updateObject) => {
    let currentState = await tableModel.query().findById(id);
    let patchedPayload = _.extend(_.clone(currentState), updateObject);
    return tableModel.query().findById(id).patch(patchedPayload);
}

module.exports = DbUtils;
