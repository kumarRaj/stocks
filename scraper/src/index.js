const cheerio = require("cheerio");
const axios = require("axios");
const parser = require("./parseHTML.js")
const fileSystem = require("./fileSystem")

const HTTP_TOO_MANY_REQUESTS = 429;
const SLEEP = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const RETRY_MAX_ATTEMPTS = 5;
const RETRY_BASE_DELAY_MS = 2000;
const RETRY_MAX_DELAY_MS = 60000;

class RateLimitRetriesExhaustedError extends Error {
    constructor(stockId, cause) {
        super(`Rate limit retries exhausted for ${stockId}`);
        this.name = "RateLimitRetriesExhaustedError";
        this.stockId = stockId;
        this.cause = cause;
    }
}

const stockDetailsHandler = (exports.handler = async function (event) {
    // TODO: Fetch only if it doesn't exist
    console.log("Fetching stock details for: " + event)
    const ratios = await withRateLimitRetry(event, (stockId) => getStockDetails(stockId));
    await fileSystem.save({lastUpdatedAt: new Date(), ...ratios}, "data", ratios.StockId);
    return ratios;
});

function withRateLimitRetry(stockId, task, attempt = 0) {
    return task(stockId).catch(async (error) => {
        if (!isRateLimited(error)) {
            throw error;
        }
        if (attempt >= RETRY_MAX_ATTEMPTS) {
            throw new RateLimitRetriesExhaustedError(stockId, error);
        }
        const delay = retryDelayFor(error, attempt);
        console.log(`Rate limited for ${stockId}, retrying after ${Math.round(delay / 1000)}s (attempt ${attempt + 1} of ${RETRY_MAX_ATTEMPTS})`);
        await SLEEP(delay);
        return withRateLimitRetry(stockId, task, attempt + 1);
    });
}

function isRateLimited(error) {
    return error?.response?.status === HTTP_TOO_MANY_REQUESTS;
}

function retryDelayFor(error, attempt) {
    const retryAfter = Number(error.response?.headers?.["retry-after"]);
    if (Number.isFinite(retryAfter) && retryAfter > 0) {
        return Math.min(retryAfter * 1000, RETRY_MAX_DELAY_MS);
    }
    return Math.min(RETRY_BASE_DELAY_MS * 2 ** attempt, RETRY_MAX_DELAY_MS);
}

function getStockDetails(stockId) {
  return axios
    .get(`https://www.screener.in/company/${stockId}/consolidated`, {timeout: 10000})
    .then((response) => {
      const html = cheerio.load(response.data);
      const rawRatios = [];
      html("li", "#top-ratios").each((i, el) => {
        const stringValues = html(el)
          .text()
          .split("\n")
          .filter((x) => x.trim() !== "");
        const key = stringValues.slice(0, 1)?.join("")?.trim();
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
        "Reserves": getReserves(html),
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

function getReserves(html) {
  let reserves = parser.getDetails(
    html,
    "thead tr th",
    "tbody tr:nth-child(2) td",
    "#balance-sheet",
    "Reserves"
  );
  reserves = {...reserves, unit : "Cr"}
  return reserves
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

module.exports = {stockDetailsHandler, RateLimitRetriesExhaustedError};
