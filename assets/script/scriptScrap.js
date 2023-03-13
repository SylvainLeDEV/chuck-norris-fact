const puppeteer = require("puppeteer");
const fs = require('fs');

async function startScrapping() {
    const browser = await puppeteer.launch({ignoreDefaultArgs: ['--disable-extensions']});
    const page = await browser.newPage();
    let data = [];
    let pageNumber = 1;
    while (pageNumber <= 527) {
        console.log("Open page number " + pageNumber)
        await page.goto('http://chucknorrisfacts.fr/facts/top/'+pageNumber, {waitUntil: "networkidle2"});
        let newData = await page.evaluate(() => {
            const elements = document.querySelectorAll('.card-text')
            let texts = [];
            if (elements.length > 0) {
                elements.forEach((element) => {
                    if (element.innerText.length > 1)
                        texts.push(element.innerText)
                })
                return texts
            }
        })
        if (newData) {
            data = [...data, ...newData];
        }
        pageNumber++
    }
    const dataString = `export const dataChuckNorris = ${JSON.stringify(data)};`;
    fs.writeFile('./assets/data/data.js', dataString, (err) => {
        if (err) throw err;
    })
    await browser.close()
    console.log("Browser is close")
}
startScrapping()
