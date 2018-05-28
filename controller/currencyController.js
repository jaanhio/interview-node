const axios = require('axios');
require('dotenv').config();

const getAllCurrencyRates = (db) => {
  return (request, response) => {
    db.currency.getAllCurrencyRates((error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        const updatedDate = queryResult[0].last_update_at.toISOString().split('T')[0];
        const rates = {};
        queryResult.forEach(result => {
          const { name, rate } = result;
          rates[name] = rate;
        });
        response.status(200).send({
          date: updatedDate,
          rates: rates
        });
      }
    });
  }
};

const getSingleCurrencyRate = (db) => {
  return (request, response) => {
    const { currencyId } = request.params;
    db.currency.getSingleCurrencyRate(currencyId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send(queryResult);
      }
    });
  }
};

const updateCurrencyRates = (db) => {
  return (request, response) => {
    const { fixerKey } = process.env;
    const fixerAPIEndpoint = `http://data.fixer.io/api/latest?access_key=${fixerKey}&format=1`;
    axios.get(fixerAPIEndpoint)
      .then(res => {
        const updatedCurrencyDetails = res.data;
        db.currency.updateCurrencyRates(updatedCurrencyDetails, (error, queryResult) => {
          if (error) {
            console.log(error.stack);
          }
          else {
            response.status(200).send({
              currenciesUpdate: true
            });
          }
        });
      });
  }
};

module.exports = {
  getAllCurrencyRates,
  getSingleCurrencyRate,
  updateCurrencyRates
};