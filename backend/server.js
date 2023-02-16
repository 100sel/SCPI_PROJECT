const express = require('express')
const app = express()
const fs = require('fs');
const { GetData } = require('./getData')

async function refresh() {

    console.log("Reading json");
    try {
        const jsonData = await fs.promises.readFile('./data.json', 'utf-8');
        if (jsonData.length > 3) {
            return JSON.parse(jsonData)
        }
    } catch (e) {}

    console.log("Scrapping data");
    let crawlerData = await GetData();
    fs.writeFile('./data.json', JSON.stringify(crawlerData), () => console.log("JSON written"));
    return crawlerData;
}

app.get("/api/refresh", (req, res) => {
    console.log("Refreshing data");
    refresh().then(data => res.json(data));
})

app.listen(5000, () => { console.log("Server started on port 5000") });