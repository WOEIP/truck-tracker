
'use strict';

async function up(knex) {
    await knex.schema.alterTable('users', function(t) {
        t.boolean('is_verified').notNullable().defaultTo(false).alter();
    });
};

async function down(knex) {
    await knex.schema.alterTable('users', function(t) {
        t.boolean('is_verified').notNullable().defaultTo(true).alter();
    });
};

module.exports = {up, down};
