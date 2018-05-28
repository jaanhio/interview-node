module.exports = (pool) => {
  return {
    createLevel: (trackerId, alertLevel, callback) => {
      const queryString = 'INSERT INTO tracker_level (tracker_id, alert_level) VALUES ($1, $2);';
      const values = [trackerId, alertLevel];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    deleteLevel: (levelId, callback) => {
      const queryString = 'DELETE from tracker_level where id = $1;';
      pool.query(queryString, [levelId], (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    },
    updateLevel: (levelId, alertLevel, callback) => {
      const queryString = 'UPDATE tracker_level SET alert_level = $1 where id = $2;';
      const values = [alertLevel, levelId];
      pool.query(queryString, values, (error, queryResult) => {
        if (error) {
          console.log(error);
        }
        else {
          callback(error, queryResult);
        }
      });
    }
  }
}