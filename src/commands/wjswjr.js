const {makeEmbedMessage} = require('../functions/httpserach.js');

module.exports = {
	name : "전적",
	execute(msg,args) {
		makeEmbedMessage(args[0]).then((embmsg) => {
			msg.channel.send(embmsg);
		})
		.catch((error) => {
			if ((error).isAxiosError) {
				const axioserror = error;
				console.log(axioserror.request);
			}
			console.log(error.message);
			msg.channel.send('에러가 발생했습니다.');
		})
	}
}