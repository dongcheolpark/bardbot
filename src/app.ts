import fs from 'fs';
import { Client } from 'discord.js';
import { prefix, token } from './config.json';
import httpserach from './functions/httpserach';
import { AxiosError } from 'axios';
import {TeamList} from './classes/List';
import Teams from './functions/Team';


const client = new Client();

let TeamData = new TeamList();

client.on('ready', () => {
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args[0];

	try {
		if(command === '응애') {
			message.channel.send('애응');
		}
		else if(command === '느금마') {
			message.channel.send('니애미');
		}
		else if(command === '전적') {
			httpserach.makeEmbedMessage(args[1]).then((embmsg) => {
				message.channel.send(embmsg);
			})
			.catch((error) => {
				if ((error as AxiosError).isAxiosError) {
					const axioserror : AxiosError = error;
					console.log(axioserror.request);
				}
				console.log(error.message);
				message.channel.send('에러가 발생했습니다.');
			})
		}
		else if(command === '팀') {
			if(args[1] === '추가') {
				if(args[2] === null) {
					throw '';
				}
				message.channel.send(Teams.AddTeam(TeamData,args[2]));
			}
		}
		else {
			throw '';
		}
	}
	catch {
		message.channel.send("잘못된 명령입니다.");
	}
});

client.login(token);