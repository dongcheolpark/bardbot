const discordTTS = require('discord-tts');

module.exports = {
	playtts(client,msg) {
			const broadcast = client.voice.createBroadcast();
			const channelId = msg.member.voice.channelID;
			const channel = client.channels.cache.get(channelId);
			channel.join().then(connection => {
				broadcast.play(discordTTS.getVoiceStream('test 123'));
				const dispatcher = connection.play(broadcast);
				console.log('성공적으로 말했습니다.');
			});
	}
}