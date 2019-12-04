const request = require('request');
const cheerio = require('cheerio');

request('https://www.fincaraiz.com.co/arriendos/barranquilla/', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(body);
        const paginador = $('div#divPaginator > a');
        const resp = paginador.toArray().map(item => {
            const $item = $(item);
            return {
                item: $item.text().trim(),
                link: $item.attr('href')
            }
        });
        console.log(resp);
    }
}) 