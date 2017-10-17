var express = require('express');
var bodyParser = require('body-parser');
var dicebot = require('./dicebot');
var backend_user_roll = require('./backend_user_roll');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));


// test route
app.get('/', function (req, res) { res.status(200).send('Go away') });

// dicebot
app.post('/roll', dicebot);
app.post('/backend_user_roll', backend_user_roll);


// basic error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});


app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
