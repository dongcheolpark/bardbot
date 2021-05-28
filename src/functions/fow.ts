import axios from 'axios';
import cheerio from 'cheerio';
import { createSolutionBuilder } from 'typescript';

export interface SummonerInfo {
  name: string;
  soloRank : string;
  flexRank : string;
}

export interface MostChamp {
  champName: string;
  winRatio: number;
  totalGame: number;
  kda: number | string;
}

export interface RecentSolo {
  wins: number;
  losses: number;
  kda: number | string;
}

const requestHeader = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.107.16 Safari/537.36',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
};

async function GetTierMedal(name : string) {
  const response = await axios.get(
    `http://fow.kr/find/${encodeURI(name)}`,
    {
      headers: requestHeader 
    }
  ); 
  const data = cheerio.load(response.data);
  let url = 'http:'
  let a = data('body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div.table_summary > div:nth-child(2) > div:nth-child(1) > img').attr('src');
  url += a;
  return url;
}

async function GetSummonerInfo(nameInput:string) {
  const response = await axios.get(
    `http://fow.kr/find/${encodeURI(nameInput)}`,
    {
      headers: requestHeader 
    }
  ); 

  const data = cheerio.load(response.data);
  try {
    const name = nameInput;
    const soloRank = data('body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div.table_summary > div:nth-child(2) > div:nth-child(2)').text();
    const flexRank = data('body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div.table_summary > div:nth-child(4) > div:nth-child(2)').text();
    return {
      soloRank,
      flexRank
    } as SummonerInfo;
  }
  catch {
    return null;
  }
  return null;
}

export default {
  GetSummonerInfo,
  GetTierMedal,
};