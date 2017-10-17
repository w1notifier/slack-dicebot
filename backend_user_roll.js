var request = require('request');

module.exports = function (req, res, next) {

  var botPayload = {};
  var users = require('./backend_users_roll.json');

  botPayload.text = 'The winner is ' + users[Math.floor(Math.random()*users.length)];
  botPayload.channel = req.body.channel_id;

  send(botPayload, function (error, status, body) {
    if (error) {
      return next(error);

    } else if (status !== 200) {
      // inform user that our Incoming WebHook failed
      return next(new Error('Incoming WebHook: ' + status + ' ' + body));

    } else {
      return res.status(200).end();
    }
  });
}

function send (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = process.env.SLACK_WEBHOOK_URL;
 
  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
