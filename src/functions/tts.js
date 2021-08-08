const fs = require('fs');
const axios = require('axios');
const requestHeader = {
	'Content-Type': 'application/xml',
	'Authorization' : 'KakaoAK 1e98f218158987e2c1b579f34ff5f65f'
}

module.exports = {
	playtts(client,msg) {
			const channelId = msg.member.voice.channelID;
			const channel = client.channels.cache.get(channelId);
			channel.join().then(connection => {
				axios.post('https://kakaoi-newtone-openapi.kakao.com/v1/synthesize',`<speak>안녕하세요</speak>`,{
					headers : requestHeader
				}).then(Response => {
					Response.data.pipe(fs.createWriteStream('result.mp3'));
				});
				console.log('성공적으로 말했습니다.');
			});
	}
}