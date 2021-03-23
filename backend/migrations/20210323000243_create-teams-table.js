'use strict';

const NEW_TRUCK_TYPES = [
  'AC_BUS',
  '2_AXLE',
  'BOBTAIL',
  '3_AXLE',
  '4_AXLE',
  '5_AXLE',
  '6_PLUS_AXLE',
  'PORT_CHASSIS',
  'PORT_CONTAINER',
  'BOX_TRUCK'
];

const ORIGINAL_TRUCK_ENUM_QUERY = "ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_truck_type_check; ALTER TABLE reports ADD CONSTRAINT reports_truck_type_check CHECK (truck_type = ANY (ARRAY['AC_BUS'::text, '2_AXLE'::text, 'BOBTAIL'::text, '3_AXLE'::text, '4_AXLE'::text, '5_AXLE'::text, '6_PLUS_AXLE'::text, 'PORT_CHASSIS'::text, 'PORT_CONTAINER'::text]));"

const NEW_TRUCK_ENUM_QUERY = "ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_truck_type_check; ALTER TABLE reports ADD CONSTRAINT reports_truck_type_check CHECK (truck_type = ANY (ARRAY['AC_BUS'::text, '2_AXLE'::text, 'BOBTAIL'::text, '3_AXLE'::text, '4_AXLE'::text, '5_AXLE'::text, '6_PLUS_AXLE'::text, 'PORT_CHASSIS'::text, 'PORT_CONTAINER'::text, 'BOX_TRUCK'::text]));"

async function up(knex) {
    await knex.schema.createTable('teams', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('team_name').notNullable();
        table.boolean('ask_for_dot_number').notNullable().defaultTo(true);
        table.boolean('ask_for_photo_upload').notNullable().defaultTo(true);
        table.boolean('allow_parking_truck').notNullable().defaultTo(true);
        table.boolean('allow_idling_truck').notNullable().defaultTo(true);
        table.boolean('allow_moving_truck').notNullable().defaultTo(true);
        table.boolean('allow_moving_truck_single_click').notNullable().defaultTo(false);
        table.boolean('ask_for_time').notNullable().defaultTo(true);

        NEW_TRUCK_TYPES.map(truckType => {
            table.boolean('allow_' + truckType).notNullable().defaultTo(true);
        });
    });

    await knex.schema.createTable('teams_users', table => {
        table.uuid('user_id').notNullable;
        table.uuid('team_id').notNullable;
        table.foreign('user_id').references('users.id');
        table.foreign('team_id').references('teams.id');
        table.boolean('is_team_admin').defaultTo(false);
        table.primary(['user_id', 'team_id']);
    });

    await knex.raw(NEW_TRUCK_ENUM_QUERY);
}

async function down(knex) {
    await knex.schema.dropTable('teams_users');
    await knex.schema.dropTable('teams');
    await knex.raw(ORIGINAL_TRUCK_ENUM_QUERY);
}

module.exports = {up, down};
