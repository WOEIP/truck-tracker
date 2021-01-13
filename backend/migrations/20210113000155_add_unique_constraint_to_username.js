'use strict';

async function up(knex) {
    await knex.schema.alterTable('users', function(t) {
        t.unique('username')
    });
}

async function down(knex) {
    await knex.schema.alterTable('users', function(t) {
        t.dropUnique('username')
    });
}


module.exports = {up, down};

