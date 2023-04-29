const cheerio = require("cheerio");
const axios = require("axios");

function getDetails(html, yearSelector, dataSelector, sectionSelector) {
    const year = [];
    const data = [];
    html(yearSelector, sectionSelector).each((i, el) => {
      const stringValues = html(el)
        .text()
        .split("\n")
        .filter((x) => x.trim() !== "");
      year.push(stringValues);
    });
    html(dataSelector, sectionSelector).each((i, el) => {
      const stringValues = html(el)
        .text()
        .split("\n")
        .filter((x) => x.trim() !== "");
      data.push(stringValues);
    });
  
    return parseYearlyData(year, data);
  }

  function parseYearlyData(yearData, dataValue){
    const finalData = [];
    totalLength = yearData.length;
    let isTTMPresent=false
    let TTMValue=''
    let result = {}
    for (let i = 1; i < totalLength; i++) {
      let value = dataValue[i][0] && parse(dataValue[i][0]);
      if(yearData[i][0] === 'TTM'){
        isTTMPresent=true
        TTMValue=value
        continue
      }
      let obj = { "year" : extractYear(yearData[i][0]), "value" : parseInt(value)}
      finalData.push(obj);
    }
    if (isTTMPresent)
      result = {data: finalData, TTM: TTMValue}
    else
      result = {data: finalData}
    return result;
  }

  function extractYear(input){
    const yearOnlyPattern = /[0-9]+$/;
    return parseInt(String(input).match(yearOnlyPattern))
  }

  function parse(value){
    value = value.replace('%', '')
    value = value.replace(',', '')
    return parseInt(value)
  }

  const print = console.log;

  module.exports = {getDetails, parse, print}
