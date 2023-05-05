const peerURL = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxPeerCompanies.jsp?symbol=";
const peURL = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/getPEDetails.jsp?symbol=";

const ttl = {
    categories: "3w",
    company: "2w",
    peer: "12w",
    pe: "1w",
}

module.exports = {
    peerURL, peURL, ttl
}
