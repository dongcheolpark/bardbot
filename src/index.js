const fs = require('fs');
const discord = require('discord.js');
const {Intents} = require('discord.js');
const { prefix, token } = require('./config.json');
const makelog = require('./makelog.js');
const {playtts} = require('./functions/tts.js')
const discordTTS = require('discord-tts');

const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const commands = new discord.Collection();
const commandsfiles = ['ping.js','dmddo.js','wjswjr.js','addteam.js','removeteams.js','jointeam.js','search.js','locknick.js','freenick.js']

const teamlist = new discord.Collection();

for(const item of commandsfiles) {
	const command = require(`./commands/${item}`);
	commands.set(command.name,command);	
}
let Now_Date = new Date();

client.on('ready', () => {
	makelog.log("봇이 준비되었습니다.")
	Now_Date = new Date();
<<<<<<< HEAD
	const nick_change = function() {
		const discharge_date = new Date(2023,6,3);
		const icmc = client.guilds.cache.find(a => a.id == "806860385659519086");
		console.log(discharge_date.getTime());
		let date = new Date();
		date.setTime(discharge_date.getTime() - Now_Date.getTime());
		icmc.members.cache.find(a => a.id == "806387855244918785").setNickname(`D-${date/(1000*60*60*24)}`);
	}
	nick_change();
=======
>>>>>>> caa408b4e9b84937af10217bf99f671cecd99c5c
	setInterval(function() {
		Now_Date = new Date();
		const discharge_date = new Date(2023,6,3);
		const icmc = client.guilds.cache.find(a => a.id == "806860385659519086");
		var gap = discharge_date - Now_Date;
		var day = Math.floor(gap / (1000 * 60 * 60 * 24));
		var hour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var min = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
		var sec = Math.floor((gap % (1000 * 60)) / 1000);
		let nick = `${day}일 ${hour}시간 ${min}분 ${sec}초`;
		icmc.members.cache.find(a => a.id == "806387855244918785").setNickname(nick);
	},2000);
});

const list = [];

client.on('guildMemberUpdate', (member,member2)=> {
	if(list.includes(member.id)) {
		member.setNickname(`불건전한소환사명${list.findIndex(member.id) + 1}`);
		console.log("닉네임을 성공적으로 바꾸었습니다." + member2.nickname);
	}
})

client.on('message', msg => {
	const channelId = msg.member.voice.channelID;
	if(msg.content.startsWith('<')) {
		const emoji = require('./functions/emoji.js');
		emoji.change_emoji(client,msg);
	}
	if(msg.member.id == '620208148686569475') {
		playtts(client,msg)
	} 

	if (!msg.content.startsWith(prefix) || msg.author.bot) return
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const commandname = args.shift();
	const command = commands.get(commandname);
	try {
		command.execute(msg,args,list);
	}
	catch(error) {
		console.log(error);
		msg.channel.send("잘못된 명령입니다.");
	}
});

client.login(token);
