const axios = require('axios');
const cheerio =  require('cheerio');

const requestHeader = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.107.16 Safari/537.36',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
};

module.exports = {
  async GetTierMedal(name) {
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
  },
  async GetSummonerInfo(nameInput) {
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
      }
    }
    catch {
      return null;
    }
    return null;
  }
}
