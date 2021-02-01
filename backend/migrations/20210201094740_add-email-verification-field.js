'use strict';

async function up(knex) {
    await knex.schema.table('users', table => {
        table.boolean('is_email_verified').notNullable().defaultTo(false);
    })
}

async function down(knex) {
    await knex.schema.table('users', table => {
        table.dropColumn('is_email_verified')
    })
}

module.exports = {up, down};
