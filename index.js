const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.olx.com.co/items';
request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(body);
        const list_prod = $('.EIR5N').toArray().map((prod) => {
            const $prod = $(prod);
            return {
                producto: $prod.find('._2tW1I').text(),
                precio: $prod.find('._89yzn').text(),
                link: `https://www.olx.com.co${$prod.find('a').attr('href')}`,
                lugar: $prod.find('.tjgMj').text(),
                fecha: $prod.find('.zLvFQ').text()
            }
        })
        console.log(list_prod);
    }
}) 