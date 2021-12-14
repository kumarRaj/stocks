const axios = require('axios');
const resources = require('./constants/resources')
const aws = require("./aws")


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
  const objectName = "category/" + result.name;
  await aws.saveToS3(objectName, result)
}

// fetchNifty50Companies();
