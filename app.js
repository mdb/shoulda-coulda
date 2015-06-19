var SlackBot = require('slackbots'),
    redis = require('redis').createClient(),
    bot = new SlackBot({
      token: process.env.CLAUDE_TV_TOKEN,
      name: 'claude_tv'
    }),
    params = {
      icon_emoji: ':cat:'
    };

bot.on('start', handleStart);
bot.on('message', handleMessage);

function handleStart(data) {
  bot.postMessageToChannel('bottest', 'Hey!', params);
}

function handleMessage(data) {
  var json = JSON.parse(data);

  if (!shouldRespond(json)) { return false; }

  redis.incr('shouldCount');
  redis.get('shouldCount', reportCount);
}

function reportCount(err, reply) {
  if (err) console.log(err);

  bot.postMessageToChannel('bottest', '"should" has been said ' + reply.toString() + ' times in this channel since I was born', params);
}

function shouldRespond(data) {
  return data.text &&
         data.username !== 'claude_tv' &&
         includesShould(data.text);
}

function includesShould(string) {
  return string.toLowerCase()
               .indexOf('should') > -1;
}
