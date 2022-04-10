const axios = require('axios');
const resources = require('./constants/resources')
const saveLocal = require("./saveLocal")


function getCompanyNames() {
    return axios.get(resources.nifty50URL)
    .then(function (response) {
        companies = response.data.data;
        companyNames = companies.map( company => company.symbol)
        return companyNames
    });
  }

async function fetchNifty50Companies(){
  let companies = await getCompanyNames();
  result = {name : "NIFTY50", company : companies}
  await saveLocal.save(result,"category", result.name)
}

module.exports = {fetchNifty50Companies};
