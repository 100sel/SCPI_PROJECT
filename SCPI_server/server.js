const express = require('express')
const app = express()
const fs = require('fs');
const { GetData } = require('./getData')

function Refresh() {

    async function Process() {
        console.log("Reading json");
        let jsonData = await fs.promises.readFile('../data.json', 'utf-8');       
        let finalData;

        if (jsonData.length < 3) {
            console.log("Getting data");
            let crawlerData = await GetData();
            fs.writeFile('../data.json', JSON.stringify(crawlerData), () => console.log("JSON written"));
            finalData = crawlerData;
        } else {
            finalData = await JSON.parse(jsonData);
        }

        return finalData
    }

    const Main = new Promise((res) => {    
        let Data = Process();       
        res(Data); 
    });

    return Main;
}

app.get("/api/refresh", (req, res) => {
    console.log("Refreshing data");
    Refresh().then(data => res.json({ scpiList : data }));
})

app.listen(5000, () => { console.log("Server started on port 5000") });