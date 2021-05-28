import fs from 'fs';
import { Client } from 'discord.js';
import { prefix, token } from './config.json';
import httpserach from './functions/httpserach';
import { AxiosError } from 'axios';

const client = new Client();

client.on('ready', () => {
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args[0];

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
	else {
		message.channel.send("잘못된 명령입니다.");
	}
});

client.login(token);