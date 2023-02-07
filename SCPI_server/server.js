const express = require('express')
const app = express()
const { GetData } = require('../SCPI_crawling/getData')

let scpiList = [];

app.get("/api/results", (req, res) => {
    console.log("get request");
    res.json({ scpiList : scpiList});
})

app.get("/api/refresh", (req, res) => {
    console.log("refreshing data");
    GetData().then(data => scpiList = data);
})

app.listen(5000, () => { console.log("Server started on port 5000") });