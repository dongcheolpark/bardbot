import Message, { EmbedFieldData, MessageEmbed } from 'discord.js';
import { FileWatcherEventKind, isJsxOpeningFragment } from 'typescript';
import fow, { SummonerInfo, MostChamp, RecentSolo } from "./fow";

async function getText(name: string) {
    const SummonerInfo = await fow.GetSummonerInfo(name);
    return SummonerInfo;
}

function makeTierField(SummonerInfo : SummonerInfo) {
    const {
        name,
        soloRank,
        flexRank,
    } = SummonerInfo;

    const solofiled : EmbedFieldData = {
        name : "솔랭",
        value : soloRank,
        inline : true,
    };
    const flexfiled : EmbedFieldData = {
        name : "자랭",
        value : flexRank,
        inline : true,
    };
    
    return [solofiled , flexfiled];
}

async function makeEmbedMessage(name : string) {
    let embmsg = new MessageEmbed()
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

export default {
    getText,
    makeEmbedMessage,
}