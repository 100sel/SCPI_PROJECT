const fs = require('fs');
const puppeteer = require('puppeteer');

function GetData() {

    function Scpi(index, scpiLabel, scpiUrl) {
        this.index = index;
        this.scpiLabel = scpiLabel;
        this.scpiUrl = scpiUrl;
    };
    const url = "https://www.boursorama.com/patrimoine/immobilier/scpi-opci/scpi/recherche";

    /* Main Process */

    async function Process() {

        let scpiList = []; 

        /* Duplication template */

        console.log("Duplicating template");
        fs.copyFile('report_template.csv', 'report.csv', function (err) {
            if (err) throw err;
        });

        /* Init */

        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: false,
            userDataDir: "./tmp"
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "load" });
        try {
            await page.click('.didomi-continue-without-agreeing', { timeout: 2000 });
            console.log("Removed the freaking popup");
        }
        catch (err) {
            console.log("No popup bitch");
        }
        await page.waitForSelector('.c-table__body > .c-table__row');
        console.log("Landing OK");

        /* Crawler function */

        async function Crawler(urlPage) {
            await page.goto(urlPage);
            await page.waitForSelector('.c-table__body > .c-table__row');

            let table = await page.$$('.c-table__body > .c-table__row');

            for (let row of table) {
                let scpiLabel = await page.evaluate(el => el.querySelector('div > div.o-pack__item.u-ellipsis.u-color-cerulean > a').textContent, row);
                let scpiUrl = await page.evaluate(el => el.querySelector('div > div.o-pack__item.u-ellipsis.u-color-cerulean > a').href, row);
                scpiList.push(new Scpi(indexNumber, scpiLabel, scpiUrl));
                indexNumber++;
            }
        }

        /* Crawling */

        const numberOfPages = await page.$$('.c-link.c-link--no-underline.c-pagination__link');
        var indexNumber = 1;

        for (let i = 1; i <= numberOfPages.length; i++) {
            console.log(`Geting table on page ${i}`);
            await Crawler(url.concat("", `/page-${i}`));
        }

        /* Scrapper function */

        async function Scrapper(scpi) {
            await page.goto(scpi.scpiUrl);
            await page.waitForSelector('.o-grid');

            let scpiKpis = [];
            let tmpKpis = await page.$$('.c-list-info__item.c-list-info__item--no-gutter');

            for (let kpi of tmpKpis) {
                let addKpi = await page.evaluate(el => el.querySelector('p.c-list-info__value.u-text-size-lg').innerText, kpi);
                scpiKpis.push(addKpi);
            }

            tmpKpis = await page.$$('.c-list-info__item.o-vertical-interval-bottom');

            for (let kpi of tmpKpis) {
                let addKpi = await page.evaluate(el => el.querySelector('p.c-list-info__value').innerText, kpi);
                scpiKpis.push(addKpi);
            }

            tmpKpis = await page.$$('.c-list-info__item.o-vertical-interval-bottom-small');

            for (let kpi of tmpKpis) {
                let addKpi = await page.evaluate(el => el.querySelector('p.c-list-info__value').innerText, kpi);
                scpiKpis.push(addKpi);
            }

            scpi.tauxDistrib = scpiKpis[0];
            scpi.prixPart = scpiKpis[1].replace(/\D+/g, "");
            scpi.gestionnaire = scpiKpis[2];
            scpi.typeCapital = scpiKpis[3];
            scpi.dateCreation = scpiKpis[4].replace(/\D+/g, "");
            scpi.typeScpi = scpiKpis[5];
            scpi.fraisSouscri = scpiKpis[8];
            scpi.fraisGestion = scpiKpis[9];
            scpi.investMini = scpiKpis[10].replace(/\D+/g, "");
            scpi.typeMarche = scpiKpis[11].replace('é', "e");
            scpi.capital = scpiKpis[12].replace(/\D+/g, "");
            scpi.tauxOccupation = scpiKpis[16];
            scpi.valeurAnr = scpiKpis[17].replace(/\D+/g, "");
            scpi.valeurRan = scpiKpis[18];
            scpi.valeurPge = scpiKpis[19];
            scpi.nbImmeubles = scpiKpis[20];
            scpi.surfaceTotale = scpiKpis[21].replace(/\D+/g, "");
        }

        /* Scrapping */

        for (let scpi of scpiList) {
            console.log(`Getting ${scpi.scpiLabel}'s data, ${scpi.index}/${scpiList.length}`);
            await Scrapper(scpi);
        };
        
        /* Reporting */

        console.log("Generating report");
        scpiList.forEach(scpi =>
            fs.appendFile('report.csv', `${scpi.index}, ${scpi.scpiUrl}, ${scpi.scpiLabel}, ${scpi.dateCreation}, ${scpi.gestionnaire}, ${scpi.capital}, ${scpi.typeCapital}, ${scpi.typeMarche}, ${scpi.nbImmeubles}, ${scpi.surfaceTotale}, ${scpi.tauxOccupation}, ${scpi.tauxDistrib}, ${scpi.prixPart}, ${scpi.investMini}, ${scpi.fraisSouscri}, ${scpi.fraisGestion}, ${scpi.valeurAnr}, ${scpi.valeurRan}, ${scpi.valeurPge}\n`, function (err) {
                if (err) throw err;
            })
        )

        await page.close();
        await browser.close();

        return scpiList;
    }

    const Main = new Promise((res) => {
        let scpiList = Process();           
        res(scpiList); 
    });

    return Main;
};

module.exports = { GetData };