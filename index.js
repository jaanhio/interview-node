const app = require("express")();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
routes(app, db);

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on " + port);
});