const cheerio = require("cheerio");
const axios = require("axios");
const parser = require("./parseHTML.js")
const saveLocal = require("./saveLocal")

const stockDetailsHandler = (exports.handler = async function (event, context) {
    const ratios = await getStockDetails(event);
    await saveLocal.save(ratios, "data", ratios.StockId);
});

function getStockDetails(stockId) {
  return axios
    .get(`https://www.screener.in/company/${stockId}/consolidated/`)
    .then((response) => {
      const html = cheerio.load(response.data);

      const rawRatios = [];
      html("li", "#top-ratios").each((i, el) => {
        const stringValues = html(el)
          .text()
          .split("\n")
          .filter((x) => x.trim() !== "");
        const key = stringValues.slice(0, 1).join("").trim();
        const value = stringValues.slice(1, stringValues.length);
        rawRatios.push(value);
      });

      let ratios = {StockId: stockId};
      const getMarketCap = () => parser.parse(rawRatios[0][1].trim());
      const getPe = () => parser.parse(rawRatios[3][0] ? rawRatios[3][0].trim() : "-999999"  );
      const getDividend = () => parser.parse(rawRatios[5][0].trim());
      const getFaceValue = () => parser.parse(rawRatios[8][1].trim());
      ratios["MarketCap"] = { unit : "Cr", value : getMarketCap() };
      ratios["PE"] = { unit : "", value : getPe() };
      ratios["Dividend"] = { unit : "%", value : getDividend() }
      ratios["FaceValue"] = { unit : "", value : getFaceValue() }
      ratios["OPM"] = getOPM(html);
      ratios["NPM"] = getNPM(html);
      ratios["Debt"]= {
        "Revenue": getRevenue(html),
        "Borrowings": getBorrowing(html),
        "OtherLiabilities": getOtherLiabilities(html)
      };
        return ratios;
      });
}

function getOPM(html) {
  let OPMDetails = parser.getDetails(
    html,
    "thead:first-child tr th",
    "tbody:nth-child(2) tr:nth-child(4) td",
    "#profit-loss"
  );
  OPMDetails = {...OPMDetails, unit : "%"}
  return OPMDetails;
}

function getNPM(html) {
  let NPMDetails = parser.getDetails(
    html,
    "thead:first-child tr th",
    "tbody:nth-child(2) tr:nth-child(10) td",
    "#profit-loss"
  );
  NPMDetails = {...NPMDetails, unit : "Cr"}
  return NPMDetails
}

function getRevenue(html) {
  let revenue = parser.getDetails(
    html,
    "thead tr th",
    "tbody tr:nth-child(2) td",
    "#balance-sheet",
    "Revenue"
  );
  revenue = {...revenue, unit : "Cr"}
  return revenue
}

function getBorrowing(html) {
  let borrowing = parser.getDetails(
    html,
    "thead tr th",
    "tbody tr:nth-child(3) td",
    "#balance-sheet"
  );
  borrowing = {...borrowing, unit : "Cr"}
  return borrowing
}

function getOtherLiabilities(html) {
  let otherLiability = parser.getDetails(
    html,
    "thead tr th",
    "tbody tr:nth-child(4) td",
    "#balance-sheet"
  );
  otherLiability = {...otherLiability, unit : "Cr"}
  return otherLiability
}

module.exports = {stockDetailsHandler};
