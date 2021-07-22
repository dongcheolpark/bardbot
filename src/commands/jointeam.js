const teamlistout = require('../functions/teamlistout')

module.exports = {
	name : "게임참가",
	execute(msg,args,list) {
		if(!list.has(msg.member.id)) {
			list.set(msg.member.id,msg.member);
		}
		else {
			msg.channel.send('이미 참가하셨습니다.');
		}
		teamlistout.sendmessage(msg,teamlist);
	}
}