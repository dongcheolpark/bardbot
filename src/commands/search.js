const {google_token,engine_token} = require('../config.json');
const discord = require('discord.js');
const axios = require('axios');

const display_size = 5;

module.exports = {
	name : "검색",
	execute(msg,args) {
		try {
			if(args[0] == null) {
				msg.channel.send("검색어가 입력되지 않았습니다.");
				return;
			}
			axios.get('https://www.googleapis.com/customsearch/v1',{
				params : {
					key : google_token,
					cx : engine_token,
					q : args[0]
				}
			}).then(Response => {
				let embmsg = new discord.MessageEmbed()
					.setTitle(args[0]);
				embmsg.setImage();
				let chk = true;
				for(let i = 0;i<display_size&&i<Response.data.items.length;i++) {
					try {
						const img_src = Response.data.items[i].pagemap.cse_image[0].src;
						if(img_src != null && chk) {
							chk = false;
							embmsg.setThumbnail(img_src);
						}
					}
					catch {}
					embmsg.addField(Response.data.items[i].title,Response.data.items[i].link);
				}
				msg.channel.send(embmsg);
			}).catch(Error => {
				console.log(Error);
				msg.channel.send("검색중 오류가 발생했습니다.");
			});
		}
		catch {
			msg.channel.send("검색중 오류가 발생했습니다.");
		}
	}
}