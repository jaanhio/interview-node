module.exports = (pool) => {
  return {
    createTracker: (trackerDetails, callback) => {
      const queryString = 'INSERT INTO tracker (currency1_id, currency2_id, current_exchange_level) VALUES ($1, $2, (SELECT rate FROM currencies WHERE currencies.id = $3) / (SELECT rate FROM currencies WHERE currencies.id = $4)) returning *;';
      const { currency1Id, currency2Id } = trackerDetails;
      const values = [currency1Id, currency2Id, currency1Id, currency2Id];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows[0]);
        }
      });
    },
    readAllTrackers: (callback) => {
      const queryString = 'SELECT tracker.id, currency1_id, currencies.name AS currency1_name, currencies.rate AS currency1_rate, a.id AS currency2_id, a.name AS currency2_name, a.rate AS currency2_rate, current_exchange_level, alert_level, tracker_level.id AS alert_level_id, currencies.last_update_at FROM tracker JOIN currencies ON (tracker.currency1_id = currencies.id)JOIN currencies a ON(tracker.currency2_id = a.id) JOIN tracker_level ON(tracker_level.tracker_id = tracker.id);';
      pool.query(queryString, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows);
        }
      });
    },
    // may or may not need this end point anymore
    readSingleTracker: (trackerId, callback) => {
      const queryString = 'SELECT tracker.id, currency1_id, currencies.name AS currency1_name, currencies.rate AS currency1_rate, a.id AS currency2_id, a.name AS currency2_name, a.rate AS currency2_rate, current_exchange_level, alert_level, currencies.last_update_at FROM tracker JOIN currencies ON (tracker.currency1_id = currencies.id)JOIN currencies a ON(tracker.currency2_id = a.id) JOIN tracker_level ON(tracker_level.tracker_id = tracker.id) WHERE tracker.id = $1;';
      pool.query(queryString, [trackerId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult.rows);
        }
      });
    },
    deleteTracker: (trackerId, callback) => {
      const queryString = 'DELETE from tracker_level WHERE tracker_id = $1;';
      pool.query(queryString, [trackerId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          const queryString = 'DELETE from tracker WHERE id = $1;';
          pool.query(queryString, [trackerId], (error, queryResult) => {
            if (error) {
              console.log(error);
            }
            else {
              callback(error, queryResult);
            }
          });
        }
      });
    }
  }
}