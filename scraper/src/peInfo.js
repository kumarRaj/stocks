const axios = require('axios');
const resources = require('./constants/resources')
const fileSystem = require("./fileSystem")

async function fetchPE(stockId) {
    let peDetails = await loadPE(stockId)
    await fileSystem.save(peDetails, "pe", peDetails.stockId);
}

async function loadPE(stockId) {
    const config = {
        method: 'get',
        url: resources.peURL + stockId,
    };

    return await axios(config)
        .then(function (response) {
            let data = response.data;
            let result = {
                stockId: data.symbol,
                sector: data.sector.trim(),
                pe: parseInt(data.PE),
                sectorPE: parseInt(data.sectorPE)
            }
            return result
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {fetchPE};
