var express     = require('express');
var router      = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var ObjectID    = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/interviewnode', (err, client) => {

      if(err) return console.log(err);

     let db = client.db('interviewnode');
     
     closure(db);

    });
};

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

let response = {
    status: 200,
    data: [],
    message: null
};

//GET api rates
/*router.get('/rates', (req, res) => {

    connection((db) => {
        db.collection('rates')
        .find()
        .toArray()
        .then((rates) => {
            response.data = rates;
            res.json(response);
        })
        .catch((err) => {
            sendError(err, res);
        });
    });
});*/

//GET api rates key only

router.get('/rates', (req, res) => {

    connection((db) => {
       db.collection('rates')
       .aggregate({$project: {arrayofkeyvalue: {$objectToArray: "$$ROOT"} }}, 
       {$project:{"keys":"$arrayofkeyvalue.k"}})
       .toArray()
       .then((rates) => {
           response.data = rates;
           res.json(response);
       })
       .catch((err) => {
           sendError(err, res);
       });
    });
});

//POST api rates
router.post('/rates', (req, res) => {
    connection((db) => {
    db.collection('rates')
    .save(req.body, (err, result) => {
     if(err) return console.log(err);
     
     console.log("Data saved.");
    });
   });
});

//DELETE api rates
router.delete('/rates', (req, res) => {
    connection((db) => {

    console.log(req.body);
    
    db.collection('rates')
    .update({},{$unset: req.body},{multi:true}, (err, result) => {
      if(err) return console.log(err);
      res.json(result)

      console.log("Record Deleted.");
      });
    });
});

//UPDATE api rates
router.put('/rates', (req, res) => {


});

module.exports = router;