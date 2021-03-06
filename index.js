const axios = require('axios');
const _ = require('lodash');
const cheerio = require('cheerio');
const moment = require('moment-timezone');

// let url = `https://royaleapi.com/player/8C8Q80QRG/battles`;
let url = `https://royaleapi.com/player/PG829G02/battles`;

async function getData() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const battles = $('[data-battle-type=friendly]');

    battles.each(function(i, elem) {
      let a = $(this).find('.blue.label.ribbon');
      let b = $(this).find('.red.label.ribbon');
      let play1 = $(this).find('[href="/player/PG829G02/battles"]').text();
      let play2 = $(this).find('[href="/player/8C8Q80QRG/battles"]').text();
      let id = $(this).attr('id');
      let timestamp = id.replace('battle_', '') *1000;
      date = moment.tz(timestamp, "Asia/Taipei");

      console.log(play1);
      console.log('win: ', a.length)
      console.log('lose: ', b.length)
      console.log(play2);
      console.log('date: ', date.format('YYYY-MM-DD HH:mm'))
      console.log('------------------');
    })
  } catch (error) {
    console.error('err', error)
  }
}

getData();