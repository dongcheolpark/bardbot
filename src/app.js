const Discord = require('discord.js');
const client = new Discord.Client();
const token = require("./token.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === '느금마') {
    msg.reply('정해윤');
  }
  if (msg.content === '니애미') {
    msg.reply(':1620207266916:');
  }
});

client.login(token.token);