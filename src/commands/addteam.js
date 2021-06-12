const Discord = require('discord.js')
const auth = require('../functions/auth.js')

module.exports = {
    name : "팀추가",
    execute(msg,args) {
        if(!auth.admin(msg)) {
            msg.channel.send("권한이 존재하지 않습니다.");
            return;
        }
        const category = msg.guild.channels.cache.find(c => c.id == "853266837638873118" && c.type == "category")
        args.forEach(element => {
            msg.guild.roles.create({
                data: {
                    name: `${element}`,
                    color: 'GREEN',
                },
            })
            .then(role => {
                msg.guild.channels.create(`${element}`, {
                    type : 'text',
                    permissions : [],
                }).then(channel => {
                        channel.setParent(category.id);
                        channel.createOverwrite(msg.guild.roles.cache.find(a => a.name == '@everyone'), { // Disallow Everyone to see, join, invite, or speak
                            'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
                            'CONNECT': false,                       'SPEAK': false
                        });
                        channel.createOverwrite(role, { 'VIEW_CHANNEL' : true, 'CONNECT' : true})
                    });


                msg.guild.channels.create(`${element}`,{
                    type : 'voice',
                    permissions : [],
                }).then(channel => {
                    channel.setParent(category.id);
                    channel.createOverwrite(msg.guild.roles.cache.find(a => a.name == '@everyone'), { // Disallow Everyone to see, join, invite, or speak
                        'CREATE_INSTANT_INVITE' : false,        'VIEW_CHANNEL': false,
                        'CONNECT': false,                       'SPEAK': false
                    });
                    channel.createOverwrite(role, { 'VIEW_CHANNEL' : true, 'CONNECT' : true})
                });
            })
            .catch(console.error);
        });
    }
}