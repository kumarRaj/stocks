var express = require('express');
var app = express();
const scrapper = require("./index")
const categories = require("./category/loadNSECategories")

app.get('/ping', function (req, res) {
    res.end( "Successfull!!!" );
})

app.post('/stockDetails', async function (req, res) {
    var stockId = req.query.stockId;
    console.log(stockId)
    try{
        if (stockId){
            await scrapper.testHandler(stockId)
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId : stockId,
                message: error.message,
            },
        });
    }
})

//Loads company names in specific category, Also stores the category names
categories.fetchCategories()

var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Scrapper app listening at http://localhost:%s", port)
})