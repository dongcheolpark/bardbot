module.exports = {
	admin(msg) {
		try {
			if (msg.member.roles.cache.has("841317951458115604")) {
				return true;
			}
			return false;
		}
		catch {
			return false;
		}
	}
}