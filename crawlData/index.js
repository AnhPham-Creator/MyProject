var puppeteer = require('puppeteer');
let crawled = async () => {
    const browser = await puppeteer.launch( {headless : false} );
    const page = await browser.newPage();
    await page.goto('https://vnexpress.net/', { waitUntil : 'networkidle2' });

    await browser.close();
};

crawled();