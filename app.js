const rp = require('request-promise');
const url = "https://www.calnewport.com/blog/page/";
const $ = require('cheerio');
const fs = require('fs');

let fetchData = async (url) => {
    const articles = [];

    for (let j = 1; j <= 107; j++) {
        const currentUrl = url + j;

        await rp(currentUrl)
            .then(function (html) {
                let n = $("h2 > a", html).length;

                for (let i = 0; i < n; i++) {
                    const link = $('h2 > a', html)[i].attribs.href;
                    const title = $('h2 > a', html)[i].children[0].data;
                    let object = { "title": title, "link": link };
                    articles.push(object);
                }
            })
            .catch(function (err) {
                console.log(error);
            });
    }

    // console.log(articles);
    fs.writeFileSync("Cal_Newport_articles.json", JSON.stringify(articles, null, 2), (err) => {
        console.log(err);
    });
}


fetchData(url);