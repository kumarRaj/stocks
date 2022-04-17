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
        let result = {name : data.symbol, sector : data.sector.trim(), pe: data.PE, sectorPE: data.sectorPE}
        console.log(JSON.stringify(result));
        return result
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = {fetchPE};
