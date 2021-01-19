'use strict';

const {Model, snakeCaseMappers} = require('objection');

// Provide the knex instance to objection
Model.knex(require('../lib/knex.js'));

class BaseModel extends Model {
    static get modelPaths() {
        return [__dirname];
    }

    /**
     * In the code we use camel case, in the db field names snake case
     * https://vincit.github.io/objection.js/api/model/static-properties.html#static-columnnamemappers
     **/
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}

module.exports = {BaseModel};
