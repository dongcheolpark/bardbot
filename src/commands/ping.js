module.exports = {
	name : "ping",
    execute(msg,arg) {
        msg.channel.send('pong!')
    }
}