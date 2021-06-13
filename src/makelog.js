module.exports = {
	log(string) {
		let today = new Date();
		let date = today.getMonth()+1 + "/" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		console.log("["+date+"]"+ " " + string);
	}
}