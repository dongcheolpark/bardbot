const discord = require('discord.js');
const fow = require('./fow.js');

async function getText(name) {
    const SummonerInfo = await fow.GetSummonerInfo(name);
    return SummonerInfo;
}

function makeTierField(SummonerInfo) {
    const {
        name,
        soloRank,
        flexRank,
    } = SummonerInfo;

    const solofiled = {
        name : "솔랭",
        value : soloRank,
        inline : true,
    };
    const flexfiled = {
        name : "자랭",
        value : flexRank,
        inline : true,
    };
    
    return [solofiled , flexfiled];
}

async function makeEmbedMessage(name) {
    let embmsg = new discord.MessageEmbed()
        .setColor("#0099ff")
        .setURL(`http://fow.kr/find/${encodeURI(name)}`)
        .setAuthor('FOW.KR','','http://fow.kr/');
    const red = '#FF0000';
    const blue = '#0099ff';


    let SummonerInfo;
    try {
        SummonerInfo = await fow.GetSummonerInfo(name);
    }
    catch {
        return embmsg.setTitle('존재 하지 않는 소환사').setColor(red);
    }
    if(SummonerInfo == null) {
        return embmsg.setTitle('존재 하지 않는 소환사').setColor(red);
    }
    const tiermedal = await fow.GetTierMedal(name);
    embmsg = embmsg
        .setTitle(name)
        .setThumbnail(tiermedal)
        .addFields(makeTierField(SummonerInfo));
    return embmsg;
}

exports.makeEmbedMessage = makeEmbedMessage();