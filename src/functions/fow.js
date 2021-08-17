const axios = require('axios');
const FormData = require('form-data');
const cheerio =  require('cheerio');

const requestHeader = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.107.16 Safari/537.36',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
};

async function getFow(name) {
    const response = await axios.get(
      `http://fow.kr/find/${encodeURI(name)}`,
      {
        headers: requestHeader 
      }
    ); 
    return cheerio.load(response.data);
}

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
  async GetSummonerInfo(name) {
    try {
      const data = await getFow(name)
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
  },
  async GetCurrentGame(name) {
    try {
      const data = await getFow(name);
      const _sid = data('body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div.profile > div:nth-child(4) > a').attr('sid');
      const frm = new FormData();
      frm.append('action', 'spec');
      frm.append('sid', _sid);
      const response = await axios.post('http://fow.kr/api_new_ajax.php',frm,{
        headers: {
          ...frm.getHeaders()
        }
      });
      const data2 = cheerio.load(response.data);
      const resultName = [];
      const resultRate = [];
      const resultTier = [];
      let res = false;
      for(var i = 1;i<=5;i++) {
        resultName.push(data2(`#spec_s_l${i} > div:nth-child(7) > b > a`).text());
        resultRate.push(data2(`#spec_s_l${i} > div:nth-child(7) > span > span:nth-child(3) > font `).text());
        resultTier.push(data2(`#spec_s_l${i} > div:nth-child(5) > span:nth-child(1)`).text());
        if(resultName[i-1] == '') {
          return res;
        } 
      }
      for(var i = 1;i<=5;i++) {
        resultName.push(data2(`#spec_s_r${i} > div:nth-child(7) > b > a`).text());
        resultRate.push(data2(`#spec_s_r${i} > div:nth-child(7) > span > span:nth-child(3) > font `).text());
        resultTier.push(data2(`#spec_s_r${i} > div:nth-child(6) > span:nth-child(1)`).text());
      }
      res = {resultName,resultRate,resultTier};
      console.log(res);
      return res;
    }
    catch{

    }
  }
}
