'use strict';

async function up(knex) {
    await knex.schema.createTable('users', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').unique().notNullable();
        table.string('is_local_resident').notNullable().defaultTo(true);
        table.boolean('is_verified').notNullable().defaultTo(true);
        table.string('pw_hash').notNullable();
        table.string('pw_salt').notNullable();
        table.string('pw_algorithm').notNullable();
        table.boolean('is_admin').notNullable().defaultTo(false);
        table.timestamp('date_registered').notNullable().defaultTo(knex.fn.now());
        table.timestamp('last_login').notNullable().defaultTo(knex.fn.now());
    });
}

async function down(knex) {
    await knex.schema.dropTable('users');
}

module.exports = {up, down};
