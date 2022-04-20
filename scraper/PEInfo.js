var axios = require('axios');
const resources = require('./constants/resources')

async function fetchPE(stockId) {
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
        return JSON.stringify(result)
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = {fetchPE};
