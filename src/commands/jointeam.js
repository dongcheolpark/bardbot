const teamlistout = require('../functions/teamlistout')

module.exports = {
	name : "게임참가",
	execute(msg,args,teamlist) {
		if(!teamlist.has(msg.member.id)) {
			teamlist.set(msg.member.id,msg.member);
		}
		else {
			msg.channel.send('이미 참가하셨습니다.');
		}
		teamlistout.sendmessage(msg,teamlist);
	}
}