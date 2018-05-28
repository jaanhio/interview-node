const currencyCtrl = require('./controller/currencyController');
const trackerCtrl = require('./controller/trackerController');
const levelCtrl = require('./controller/trackLevelController');

module.exports = (app, db) => {

  /*Currency routes*/
  // get all currency rates
  app.get('/api/currency', currencyCtrl.getAllCurrencyRates(db));

  // get single currency rates
  app.get('/api/currency/:currencyId', currencyCtrl.getSingleCurrencyRate(db));

  // update currency rates 
  // not implemented yet. probably done with cron job

  /*Tracker routes*/
  // create new tracker
  app.post('/api/tracker/new', trackerCtrl.createTracker(db));

  // read all tracker details
  app.get('/api/trackers', trackerCtrl.readAllTrackers(db));

  // read individual tracker details 
  // may or may not need this end point anymore
  app.get('/api/tracker/:trackerId', trackerCtrl.readSingleTracker(db));

  // delete tracker
  app.post('/api/tracker/:trackerId/delete', trackerCtrl.deleteTracker(db));

  /*Tracker level routes*/
  // create new tracker level
  app.post('/api/tracker/:trackerId/level/new', levelCtrl.createLevel(db));

  // delete tracker level
  app.post('/api/level/:levelId/delete', levelCtrl.deleteLevel(db));

  // update tracker level
  app.post('/api/level/:levelId/update', levelCtrl.updateLevel(db));
}