const fs = require('fs');
const discord = require('discord.js')
const { prefix, token } = require('./config.json');
const makelog = require('./makelog.js');
const locknick = require('./commands/locknick');


const client = new discord.Client();

const commands = new discord.Collection();
const commandsfiles = ['ping.js','dmddo.js','wjswjr.js','smrmaak.js','addteam.js','removeteams.js','jointeam.js','locknick.js']

const teamlist = new discord.Collection();

for(const item of commandsfiles) {
	const command = require(`./commands/${item}`);
	commands.set(command.name,command);	
}

client.on('ready', () => {
	makelog.log("봇이 준비되었습니다.")
});

const nameofkim = ['애미없는년','애비없는년','엄마없는년','아빠없는년'];
const nicklist = new discord.Collection();
let cnt = 0;
let chk = 0;

client.on('guildMemberUpdate', (member,member2)=> {
	if(nicklist.has(member.id)) {
		if(chk == 1) {
			chk = 0;
			return;
		}
		member.setNickname(nameofkim[cnt]);
		if(cnt == nameofkim.length-1) {
			cnt = 0;
		}
		else {
			cnt++;
		}
		console.log("닉네임을 성공적으로 바꾸었습니다." + member2.nickname);
		chk = 1;
	}
})


client.on('message', msg => {
	try {
		const kim = msg.guild.members.cache.find(a => a.id == '586928806556598274')
		kim.setNickname('애미없는년') 
	}
	catch {
		makelog.log("김원준을 찾을 수 없습니다.");
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