const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const Xvfb = require('xvfb');
let xvfb = new Xvfb();

try {
  xvfb.startSync();
}
catch (e) {
  console.log(e);
}

const nightmare = Nightmare({ show: true })
const url = 'https://utahavalanchecenter.org/forecast/salt-lake';

nightmare
    .goto(url)
    .wait('body')
    .evaluate(() => document.querySelector('body').innerHTML)
    .end()
    .then(response => {
        console.log("poop1");
        console.log(getData("response" + response));

    }).catch(err=> {
        console.log(err);
    });


    let getData = html => {
        console.log("poop");
        //data = [];
        const $ = cheerio.load(html);
        var title = $('.text_03.pt2');
        //console.log(title.text());
        let report = title.text();
//parse report for keywords
        let high = report.match(/high/gi);
        let allAspects = report.match(/all steep/gi);
        let mid = report.match(/mid/gi);
        let upper = report.match(/upper/gi);
        let low = report.match(/low/gi);
        console.log(high);
        console.log(low);
        console.log(mid);
        console.log(upper);
        console.log(allAspects);

        return report;
    }