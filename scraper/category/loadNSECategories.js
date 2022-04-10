const axios = require('axios');
const resources = require('../constants/resources')
const saveLocal = require("../saveLocal")


function getCompanyNames(url) {
    return axios.get(url)
        .then(function (response) {
            companies = response.data.data;
            companyNames = companies.map( company => company.symbol)
            return companyNames
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
    for(let i = 0; i < categories.length; i++){
        names[i] = categories[i].name
    }
    await saveLocal.save(names, "category", "CategoryNames")
}

module.exports = {fetchCategories};