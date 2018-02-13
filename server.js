//Parameters for express
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var http       = require('http');
var app        = express();

var api        = require('./server/routes/api');

//Middleware initialize
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', api);

app.get('*'), (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
}

var port = process.env.PORT || '5000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port, () => console.log("Server is running in port 5000"));
