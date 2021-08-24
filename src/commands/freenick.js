const auth = require("../functions/auth.js")

module.exports = {
	name : "닉해제",
	execute(msg,args,list) {
		if(!(auth.admin(msg))) {
			msg.channel.send("권한이 없습니다.")
			return;
		}
		const a = msg.guild.members.cache.find(a => a.nickname == args[0])
		if(list.has(a.id)) {
			msg.channel.send("리스트에 없습니다.");
		}
		else {
			list.splice(list.findIndex(a.id),1);
		}
	}
}