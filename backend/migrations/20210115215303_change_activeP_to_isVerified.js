
'use strict';

async function up(knex) {
        await knex.schema.alterTable('users', function(t) {
            t.renameColumn('active_p', 'is_verified')
    });
};

async function down(knex) {
        await knex.schema.alterTable('users', function(t) {
            t.renameColumn('is_verified', 'active_p')
    });
};

module.exports = {up, down};