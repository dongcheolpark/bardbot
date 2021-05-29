import {List,TeamList} from '../classes/List';
import {EmbedFieldData, MessageEmbed} from 'discord.js';

function AddTeam(TeamList : TeamList,name : string) {
    TeamList.Add(name);    
    let res = '';
    TeamList.GetList().forEach(element => {
        res += element + ',\n';
    });
    const listfiled : EmbedFieldData = {
        name : "",
        value : res,
        inline : true,
    };
    let msg = new MessageEmbed()
        .setTitle('명단')
        .setColor('#0099ff')
        .addFields(listfiled);
    return msg;
}

export default {
    AddTeam,
}