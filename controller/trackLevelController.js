const createLevel = (db) => {
  return (request, response) => {
    const { trackerId } = request.params;
    const { alertLevel } = request.body;
    db.level.createLevel(trackerId, alertLevel, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          createLevelSuccess: true
        });
      }
    });
  }
};

const deleteLevel = (db) => {
  return (request, response) => {
    const { levelId } = request.params;
    db.level.deleteLevel(levelId, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          deleteLevelSucess: true
        });
      }
    });
  }
};

const updateLevel = (db) => {
  return (request, response) => {
    const { levelId } = request.params;
    const { alertLevel } = request.body;
    db.level.updateLevel(levelId, alertLevel, (error, queryResult) => {
      if (error) {
        console.log(error.stack);
      }
      else {
        response.status(200).send({
          updateLevelSuccess: true
        });
      }
    });
  }
};

module.exports = {
  createLevel,
  deleteLevel,
  updateLevel
};