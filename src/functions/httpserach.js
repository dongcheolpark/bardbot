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


module.exports = {
    async makeEmbedMessage(name) {
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
    },
    async makeCurrentGameEmbedMessage(name) {
        let message = new discord.MessageEmbed()
            .setColor("#0099ff")
            .setURL(`http://fow.kr/find/${encodeURI(name)}`)
            .setAuthor('FOW.KR','','http://fow.kr/')
        let data = await fow.GetCurrentGame(name).catch(Error => {
            message = '이 플레이어는 게임중이 아닙니다.';
        })
        if(data == false) {
            message = '이 플레이어는 게임중이 아닙니다.';
            return message;
        }
        for(let i = 0;i<5;i++) {
            message.addFields(
                {name : `[${data.resultTier[i]}]  ${data.resultName[i]}`,value : data.resultRate[i],inline : true},
                {name : `${data.resultName[5+i]}  [${data.resultTier[5+i]}]`,value : data.resultRate[5+i],inline : true},
                {name : '\u200B',value : '\u200B'},
            )
        }
        return message;
    }
}