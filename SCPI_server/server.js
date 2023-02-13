const express = require('express')
const app = express()
const fs = require('fs');
const { GetData } = require('./getData')

let scpiList = [];

const Refresh = new Promise((res) => {
    console.log("Reading json");
    fs.readFileSync('./data.json', data => {
        console.log(JSON.parse(data));
        scpiList = JSON.parse(data)}
    );

    if (scpiList.length < 1) {
        console.log("Getting raw data");
        GetData().then(data => {scpiList = data});
        fs.writeFileSync('./data.json', JSON.stringify(scpiList));
    }

    res(scpiList);
})

app.get("/api/refresh", (req, res) => {
    console.log("refreshing data");
    Refresh().then(res.json({ scpiList : scpiList}));
})

app.listen(5000, () => { console.log("Server started on port 5000") });