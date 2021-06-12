const auth = require('../functions/auth.js')
module.exports = {
    name : "팀제거",
    execute(msg,args) {
        args.forEach(element => {
            if(!auth.admin(msg)) {
                msg.channel.send("권한이 존재하지 않습니다.");
                return;
            }
            msg.guild.channels.cache.find(a => a.name == `${element}` && a.type == 'text').delete();
            msg.guild.channels.cache.find(a => a.name == `${element}` && a.type == 'voice').delete();
            msg.guild.roles.cache.find(a => a.name == `${element}`).delete();
        });
    }
}