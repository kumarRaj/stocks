const NSECategories = [
    { name : "NIFTY50", URL : "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050"},
    { name : "Bank", URL : "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20BANK" },
    { name : "Auto", URL : "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20AUTO" },
    // { name : "Energy", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxEnergyStockWatch.json" },
    // { name : "Finance", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxFinanceStockWatch.json" },
    // { name : "FMCG", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxFMCGStockWatch.json" },
    // { name : "IT", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxitStockWatch.json" },
    // { name : "Media", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxMediaStockWatch.json" },
    // { name : "Metal", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxMetalStockWatch.json" },
    // { name : "Pharma", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxPharmaStockWatch.json" },
    // { name : "PSU", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxPSUStockWatch.json" },
    // { name : "Realty", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/cnxRealtyStockWatch.json" },
    // { name : "PvtBank", URL : "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyPvtBankStockWatch.json"}
]

const peerURL = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxPeerCompanies.jsp?symbol=";
const peURL = "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/getPEDetails.jsp?symbol=";

module.exports = {
    NSECategories, peerURL, peURL
}
