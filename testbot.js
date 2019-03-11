var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as:');
    logger.info(bot.username + '-(' + bot.id + ')');
});

bot.on('message', function(user, userID, channelID, message, evt) {
    logger.info('Message: ' + message);
    if (message.substring(0, 1) == '!') {
        logger.info('command loop');
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        logger.info('Command: ' + cmd);

        switch (cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'roll':
                let roll = args[1].split('d');
                let times = roll[0];
                let sides = roll[1];
                let message = "@" + user + " Roll: `[";
                let rolls = [];
                let total = 0;

                for (let i = 0; i < times; i++) {
                    let rand = Math.floor(Math.random() * (sides)) + 1;
                    rolls.push(rand);
                    total = total + rand;
                }
                rolls.sort(function(a, b) { return b - a });
                message = message + rolls.toString();
                message = message + "]` Total: " + total;
                bot.sendMessage({
                    to: channelID,
                    message: message
                })
                break;
        }
    }
});