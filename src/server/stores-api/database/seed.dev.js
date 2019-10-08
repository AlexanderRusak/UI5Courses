'use strict';

const app = require('../server/server');
//const faker = require('faker');

app.seeder.migrate('Store', 10);
app.seeder.migrate('Product', 100);
//app.seeder.migrate('Store2Product', 100);
//app.seeder.migrate('ProductComment', 1000);