const pg = require('pg');
const currencyModel = require('./model/currencyModel');
const trackerModel = require('./model/trackerModel');
const trackLevelModel = require('./model/trackLevelModel');
require('dotenv').config();

const configs = {
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  port: process.env.db_port
};

const pool = new pg.Pool(configs);

module.exports = {
  pool: pool,
  currency: currencyModel(pool),
  tracker: trackerModel(pool),
  level: trackLevelModel(pool)
};