const request = require('request');
const cheerio = require('cheerio');

request('https://www.fincaraiz.com.co/arriendos/barranquilla/', (err, res, body) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(body);
        let inmuebles = [];
        for(i = 0; i < 20; i++) {
            const propiedad = $(`ul#rowIndex_${i}>li:nth-child(2)>div:nth-child(2)>a>div:nth-child(1)>h2`);
            const valor = $(`ul#rowIndex_${i}>li:nth-child(4)>div:nth-child(1)`);
            const hab = $(`ul#rowIndex_${i}>li:nth-child(3)>div`)
            const img = $(`ul#rowIndex_${i}>`).find('.lazy');
            inmuebles[i] = {
                titulo: propiedad.text().trim(),
                valor: valor.text().trim(),
                habitaciones: hab.text().trim(),
                img: img.attr('src')
            }
        }
        console.log(inmuebles);
        
    }
}) 