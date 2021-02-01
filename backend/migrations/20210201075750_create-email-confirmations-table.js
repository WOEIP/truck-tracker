'use strict';

async function up(knex) {
    await knex.schema.createTable('email_confirmations', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('requester_id').references('users.id');
        table.string('requester_email').notNullable();
        table.text('confirmation_hash').notNullable();
        table.timestamp('expiration_time').notNullable();
        table.boolean('is_done').notNullable().defaultTo(false);
    });
}

async function down(knex) {
    await knex.schema.dropTable('email_confirmations');
}

module.exports = {up, down};
