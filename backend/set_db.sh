#!/bin/bash
PGPASSWORD=$(echo $PGPASSWORD) psql --host localhost --user postgres --dbname postgres --command "CREATE DATABASE truck_tracker_dev;"
export NODE_ENV="development"
npx knex migrate:latest
