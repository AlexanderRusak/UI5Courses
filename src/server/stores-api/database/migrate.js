'use strict';

const app = require('../server/server');
app.seeder.migrateAll('dev');
