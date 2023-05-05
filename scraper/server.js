const express = require('express');
const app = express();
const scraper = require("./index")
const categories = require("./category/loadNSECategories")
const peerInfo = require("./peerInfo");
const peInfo = require("./peInfo");

app.get('/ping', function (req, res) {
    res.end("ok");
})

app.post('/stockDetails', async function (req, res) {
    const stockId = req.query.stockId;
    console.log("Fetching stock details for: " + stockId)
    try {
        if (stockId) {
            await scraper.stockDetailsHandler(stockId)
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId: stockId,
                message: error.message,
            },
        });
    }
})


app.post('/stock/peers', async function (req, res) {
    const stockId = req.query.stockId;
    try {
        if (stockId) {
            await peerInfo.fetchPeers(stockId);
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId: stockId,
                message: error.message,
            },
        });
    }
})


app.post('/stock/pe', async function (req, res) {
    const stockId = req.query.stockId;
    try {
        if (stockId) {
            await peInfo.fetchPE(stockId);
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId: stockId,
                message: error.message,
            },
        });
    }
})


//Loads company names in specific category, Also stores the category names
categories.seedCategories(false)

const server = app.listen(9000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Scraper app listening on http://%s:%s", host, port)
});