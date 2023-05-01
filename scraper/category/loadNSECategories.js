const axios = require('axios');
const resources = require('../constants/resources')
const fileSystem = require("../fileSystem")


function getCompanyNames(url) {
    axios.get('https://www.nseindia.com/')
        .then((response) => {
            const responseHeaders = response.headers
            console.log(responseHeaders['set-cookie'])
            const options = {
                headers: {
                    'Cookie': responseHeaders['set-cookie']
                }
            }
            axios.get(url, options)
                .then(function (response) {
                    companies = response.data.data;
                    companyNames = companies.map(company => company.symbol)
                    return companyNames
                })
                .then(function (companyNames) {
                    console.log(companyNames)
                    // return companyNames
                })
                .catch(function (error) {
                    console.log("Error fetching companies for: " + url + " " + error);
                });
        });
}

async function fetchCategories(){
    let categories = resources.NSECategories;
    for(let i = 0; i < categories.length; i++){
        let companies = await getCompanyNames(categories[i].URL);
        result = {name : categories[i].name, company : companies}
        await saveLocal.save(result,"category", result.name)
    }
    await saveCategoryNames()
}

async function saveCategoryNames() {
    let categories = resources.NSECategories;
    let names = []
    for (let i = 0; i < categories.length; i++) {
        names[i] = categories[i].name
    }
    // await fileSystem.save(names, "category", "CategoryNames")
}

module.exports = {fetchCategories};

// fetchCategories()

getCompanyNames("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20AUTO")