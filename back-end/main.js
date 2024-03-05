const postgres = require('postgres');
const { County, Event } = require('./models');
const { connectionString } = require('./dbConfig');

const sql = postgres(connectionString);