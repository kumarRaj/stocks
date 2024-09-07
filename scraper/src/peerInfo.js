var axios = require('axios');
const resources = require('./constants/resources')
const fileSystem = require("./fileSystem")

async function fetchPeers(stockId) {
    let peers = await loadPeers(stockId)
    await fileSystem.save(peers, "peers", stockId);
}

async function loadPeers(stockId) {
    var config = {
        method: 'get',
        url: resources.peerURL + stockId,
    };

    return await axios(config)
        .then(function (response) {
            let data = response.data;
            data = data.trim().replace("{industry", "{\"industry\"").replace(",data:[", ",\"data\":[");
            let dataObject = JSON.parse(data);
            let peers = [];
            for (let i = 0; i < dataObject.data.length; i++) {
                let peer = {id: dataObject.data[i].symbol, name: dataObject.data[i].name}
                peers[i] = peer;
            }
            return peers;
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {fetchPeers};
