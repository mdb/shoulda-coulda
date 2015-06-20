var SlackBot = require('slackbots'),
    request = require('request'),
    bot = new SlackBot({
      token: process.env.SHOULDA_COULDA_TOKEN,
      name: 'shoulda_coulda'
    }),
    params = {
      icon_emoji: ':cat:'
    },
    endpoint = process.env.SHOULD_COUNTER_API_ENDPOINT

bot.on('start', handleStart);
bot.on('message', handleMessage);

function handleStart(data) {
  bot.postMessageToChannel((process.env.SHOULDA_COULDA_CHANNEL || 'bottest'), 'Hey!', params);
}

function handleMessage(data) {
  var json = JSON.parse(data);

  if (!shouldRespond(json)) { return false; }

  console.log(json);

  saveCount(json, reportCount);
}

function saveCount(json, callback) {
  request.post({
    url: endpoint,
    form: {
      should: {
        user: json.user,
        context: json.text
      }
    }
  }, function(err, resp, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }

    callback();
  });
}

function reportCount() {
  request(endpoint, function(err, resp, body) {
    if (err) {
      console.log(err);
    } else {
      bot.postMessageToChannel('bottest', '"should" has been said ' + JSON.parse(body).length.toString() + ' times in this channel since I was born', params);
    }
  });
}

function shouldRespond(data) {
  return data.text &&
         data.username !== bot.name &&
         includesShould(data.text);
}

function includesShould(string) {
  return string.toLowerCase()
               .indexOf('should') > -1;
}
