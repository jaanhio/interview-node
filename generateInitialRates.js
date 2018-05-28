/* Populate the currencies table with initial data. API endpoint for creation is not created since this will only have to be initialized once at the beginning
*
*
*/

const { Pool } = require('pg');
require('dotenv').config();
const axios = require('axios');

const { fixerKey } = process.env;
const fixerAPIEndpoint = `http://data.fixer.io/api/latest?access_key=${fixerKey}&format=1`;

const configs = {
  user: process.env.db_user,
  host: process.env.db_host,
  database: process.env.db_database,
  port: process.env.db_port
};

const pool = new Pool(configs);

// fetch currency data and write to db
axios.get(fixerAPIEndpoint)
  .then(res => {
    const updatedDate = res.data.date;
    const currencyRates = res.data.rates; // object
    const listOfCurrencyKeys = Object.keys(currencyRates);
    listOfCurrencyKeys.forEach(currency => {
      const rate = currencyRates[currency];
      const queryString = 'INSERT INTO currencies (name, rate, last_update_at) VALUES ($1, $2, $3);';
      const values = [currency, rate, updatedDate];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          console.log(error.stack);
        }
        else {
          console.log('currency rates added');
        }
      });
    });
  });

