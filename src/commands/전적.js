const httpserach = require('../functions/httpserach.js');

module.exports = {
	name : "전적",
	execute(msg,args) {
		httpserach.makeEmbedMessage(args[0]).then((embmsg) => {
			message.channel.send(embmsg);
		})
		.catch((error) => {
			if ((error).isAxiosError) {
				const axioserror = error;
				console.log(axioserror.request);
			}
			console.log(error.message);
			message.channel.send('에러가 발생했습니다.');
		})
	}
}