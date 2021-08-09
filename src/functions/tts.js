const fs = require('fs');
const axios = require('axios');
const path = require('path');
const requestHeader = {
	'Content-Type': 'application/xml',
	'Authorization' : 'KakaoAK 1e98f218158987e2c1b579f34ff5f65f'
}

module.exports = {
	playtts(client,msg) {
		try {
			const channelId = msg.member.voice.channelID;
			const channel = client.channels.cache.get(channelId);
			channel.join().then(async connection => {
				await axios({
					method : 'post',
					url : 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize',
					data : `<speak>${msg.content}</speak>`,
					headers : requestHeader,
					responseType:'stream'
				}).then(response => {
					response.data.pipe(fs.createWriteStream('result2.mp3'));
					connection.play('result2.mp3');
				}).catch((err) => {
					console.log('통신 실패');
				})
			});
		}
		catch {
			console.log('변환 실패');
		}
	}
}