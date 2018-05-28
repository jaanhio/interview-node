const createTracker = (db) => {
  return (request, response) => {
    const trackerDetails = request.body;
    db.tracker.createTracker(trackerDetails, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          createNewTrackerSuccess: true,
          newTrackerId: queryResult.id
        });
      }
    });
  }
};

const readAllTrackers = (db) => {
  return (request, response) => {
    db.tracker.readAllTrackers((error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        let listOfTrackers = queryResult;
        let trackersData = [];
        listOfTrackers.forEach(tracker => {
          // if tracker already exists in array, add additionally set alert levels to its alert levels array
          let trackerIndex = trackersData.findIndex(item => {
            return item.trackerId === tracker.id
          });
          if (trackerIndex > -1) {
            trackersData[trackerIndex].alertLevels.push({
              alertLevelId: tracker.alert_level_id,
              alertLevel: tracker.alert_level
            });
          }
          // else, insert entirely new entry
          else {
            trackersData.push({
              trackerId: tracker.id,
              currency1Id: tracker.currency1_id,
              currency1Name: tracker.currency1_name,
              currency1Rate: tracker.currency1_rate,
              currency2Id: tracker.currency2_id,
              currency2Name: tracker.currency2_name,
              currency2Rate: tracker.currency2_rate,
              currentExchangeLevel: tracker.current_exchange_level,
              alertLevels: [{
                alertLevelId: tracker.alert_level_id,
                alertLevel: tracker.alert_level
              }]
            });
          }
        });
        response.status(200).send(trackersData);
      }
    });
  }
};

const readSingleTracker = (db) => {
  return (request, response) => {
    const { trackerId } = request.params;
    db.tracker.readSingleTracker(trackerId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send(queryResult);
      }
    });
  }
};


const deleteTracker = (db) => {
  return (request, response) => {
    const { trackerId } = request.params;
    db.tracker.deleteTracker(trackerId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          deleteTrackerSuccess: true
        });
      }
    });
  }
};

module.exports = {
  createTracker,
  readAllTrackers,
  readSingleTracker,
  deleteTracker
};