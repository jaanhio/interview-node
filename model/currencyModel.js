module.exports = (pool) => {
  return {
    getAllCurrencyRates: (callback) => {
      const queryString = 'SELECT * FROM currencies';
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows);
        }
      });
    },
    getSingleCurrencyRate: (currencyId, callback) => {
      const queryString = 'SELECT * FROM currencies where id = $1;';
      pool.query(queryString, [currencyId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows[0]);
        }
      });
    },
    updateCurrencyRates: (updatedCurrencyDetails, callback) => {
      const updatedDate = updatedCurrencyDetails.date;
      const currencyRates = res.data.rates;
      const listOfCurrencyKeys = Object.keys(currencyRates);
      listOfCurrencyKeys.forEach(currency => {
        const rate = currencyRates[currency];
        const queryString = 'UPDATE currencies SET rate = $1, last_update_at = $2 WHERE name = $3;';
        const values = [rate, updatedDate, currency];
        pool.query(queryString, values, (error, queryResult) => {
          if (error) {
            console.log(error);
          }
          else {
            callback(error, queryResult);
          }
        });
      });
    }
  }
}