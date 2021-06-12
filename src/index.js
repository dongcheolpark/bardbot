const fs = require('fs');
const discord = require('discord.js')
const { prefix, token } = require('./config.json');


const client = new discord.Client();

const commands = new discord.Collection();
const commandsfiles = ['ping.js','응애.js','전적.js','느금마.js']

for(const item of commandsfiles) {
	const command = require(`./commands/${item}`);
	commands.set(command.name,command);	
}

client.on('ready', () => {
	console.log("봇이 준비되었습니다.")
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandname = args.shift();
	const command = commands.get(commandname);
	try {
		command.execute(msg,arg);
	}
	catch {
		message.channel.send("잘못된 명령입니다.");
	}
});

client.login(token);