var axios = require('axios');
const resources = require('./constants/resources')
const saveLocal = require("./saveLocal")

async function fetchPE(stockId) {
    let peDetails = await loadPE(stockId)
    await saveLocal.save(peDetails, "PE", peDetails.name);
}

async function loadPE(stockId) {
    var config = {
        method: 'get',
        url: resources.peURL+stockId,
    };

    return await axios(config)
    .then(function (response) {
        let data = response.data;
        let result = {
            name : data.symbol, 
            sector : data.sector.trim(), 
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
