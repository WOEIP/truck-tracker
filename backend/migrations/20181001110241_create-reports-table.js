'use strict';

const TRUCK_TYPES = [
  'AC_BUS',
  '2_AXLE',
  'BOBTAIL',
  '3_AXLE',
  '4_AXLE',
  '5_AXLE',
  '6_PLUS_AXLE',
  'PORT_CHASSIS',
  'PORT_CONTAINER'
];

async function up(knex) {
    await knex.schema.createTable('reports', table => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.enum('truck_type', TRUCK_TYPES).notNullable();
        table.timestamp('truck_seen_at').notNullable();
        table.uuid('reporter_id').references('users.id');
        table.timestamp('reported_at').notNullable().defaultTo(knex.fn.now());
        table.boolean('was_engine_running').notNullable().defaultTo(false);
        table.boolean('was_truck_moving').notNullable().defaultTo(false);
        table.integer('idling_duration_mins').defaultTo(0);
        table.decimal('start_lat', 9, 6).notNullable();
        table.decimal('start_lon', 9, 6).notNullable();
        table.decimal('end_lat', 9, 6).notNullable();
        table.decimal('end_lon', 9, 6).notNullable();
        table.string('license_plate');
        table.string('transport_company_name');
        table.string('dot_number');
        table.string('photo_url');
    });
}

async function down(knex) {
    await knex.schema.dropTable('reports');
}

module.exports = {up, down};
