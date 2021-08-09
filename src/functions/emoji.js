const discord = require('discord.js');

module.exports = {
	change_emoji(client,msg) {
		try {
			const args = msg.content.trim().split(/ +/g);
			let emoji = args[0];
			emoji = emoji.substring(3, emoji.length - 1);
			const emojiarray = emoji.split(':');
			const botemoji = client.emojis.cache.get(emojiarray[1]);
			let embmsg = new discord.MessageEmbed()
				.setTitle(msg.member.nickname)
				.setImage(botemoji.url)
				.setColor(msg.member.displayColor)
			msg.channel.send(embmsg);
			msg.delete();
		}
		catch {
			console.log('잘못된 이모티콘입니다.');
		}
	}
}
