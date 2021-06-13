const fs = require('fs');
const discord = require('discord.js')
const { prefix, token } = require('./config.json');


const client = new discord.Client();

const commands = new discord.Collection();
const commandsfiles = ['ping.js','dmddo.js','wjswjr.js','smrmaak.js','addteam.js','removeteams.js','jointeam.js']

const teamlist = new discord.Collection();

for(const item of commandsfiles) {
	const command = require(`./commands/${item}`);
	commands.set(command.name,command);	
}

client.on('ready', () => {
	console.log("봇이 준비되었습니다.")
});


client.on('message', msg => {
	try {
		const kim = msg.guild.members.cache.find(a => a.id == '586928806556598274')
		kim.setNickname('애미없는년') 
	}
	catch {
		console.log("김원준을 찾을 수 없습니다.");
	}
	if (!msg.content.startsWith(prefix) || msg.author.bot) return

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const commandname = args.shift();
	const command = commands.get(commandname);
	try {
		command.execute(msg,args,teamlist);
	}
	catch(error) {
		console.log(error);
		msg.channel.send("잘못된 명령입니다.");
	}
});

client.login(token);