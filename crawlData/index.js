var puppeteer = require('puppeteer');
var fs = require('fs');
var download = require('image-downloader');
let crawled = async () => {
    const browser = await puppeteer.launch( {headless : true} );
    const page = await browser.newPage();
    await page.goto('https://vnexpress.net/', { waitUntil : 'networkidle2' });

    const html = await page.evaluate( () => {
        let titileLinks = document.querySelectorAll('.title-news > a');
        titileLinks = [...titileLinks];
        let result = titileLinks.map( (e) => {
            return { title: e.title, link: e.href };
        })
        return result;
    })
    await browser.close();
    let content = html.map( e => {
        return `title: ${e.title}, link: ${e.link} \n`;
    }).join('');
    fs.writeFileSync('./titile.txt', content);
};

let dowloadImage  = async () => {
    const browser = await puppeteer.launch( {headless : true} );
    const page = await browser.newPage();
    await page.goto('https://vnexpress.net/sap-co-lan-song-dich-chuyen-san-xuat-tu-trung-quoc-sang-viet-nam-4096772.html',{ waitUntil : 'networkidle2' });
    const imagelinks = await page.evaluate( () => {
        let titileLinks = document.querySelectorAll('.fig-picture > picture > img');
        titileLinks = [...titileLinks];
        let result = titileLinks.map( (e) => {
            return e.src;
        })
        return result;
    })
    await Promise.all(imagelinks.map( imgurl => {
        download.image({
            url: imgurl,
            dest: './image'
        })
    }));

    console.log('dowload image succes');
    browser.close();
}

// crawled();
dowloadImage();