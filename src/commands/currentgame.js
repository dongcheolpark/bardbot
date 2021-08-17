const {makeCurrentGameEmbedMessage} = require('../functions/httpserach.js');

module.exports = {
	name : "현재게임",
	execute(msg,args) {
		makeCurrentGameEmbedMessage(args[0]).then(message => {
			msg.channel.send(message);
		}).catch(error=>{
			msg.channel.send(error);
		});
	}
}