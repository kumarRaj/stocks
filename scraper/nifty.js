const axios = require('axios');
const resources = require('./constants/resources')
const fileSystem = require("./fileSystem")


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
  await fileSystem.save(result,"category", result.name)
}

module.exports = {fetchNifty50Companies};
