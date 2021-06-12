module.exports = {
	sendmessage(msg,teamlist) {
		let sendmessage = "지금까지 참가한 인원 : "
		for(const item of teamlist) {
			sendmessage += `${item[1].displayName},`
		}
		msg.channel.send(sendmessage);
	}
}