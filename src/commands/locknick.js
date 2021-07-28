const auth = require("../functions/auth.js")
const listout = require("../functions/teamlistout")

module.exports = {
	name : "닉고정",
	execute(msg,args,list) {
		if(!(auth.admin(msg))) {
			msg.channel.send("권한이 없습니다.")
			return;
		}
		const a = msg.guild.members.cache.find(a => a.nickname == args[0])
		list.set(a.id,a);
		listout.sendmessage(msg,list);
	}
}