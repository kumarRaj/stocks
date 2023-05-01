const axios = require('axios');
const resources = require('../constants/resources')
const fileSystem = require("../fileSystem")
const dateFormat = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
};


function getCompanyNames(url) {
    return axios.get('https://www.nseindia.com/')
        .then((response) => {
            const options = {
                headers: {
                    'Cookie': (response.headers)['set-cookie']
                }
            }
            return axios.get(url, options)
                .then(function (response) {
                    companies = response.data.data;
                    companyNames = companies.map(company => company.symbol)
                    return companyNames
                })
                .catch(function (error) {
                    console.log("Error fetching companies for: " + url + " " + error);
                });
        });
}

function isFresh(fileMetaData, ttl) {
    const weeksAgo = parseInt(ttl.split("w")[0]);
    const oneWeekInMs = 1000 * 60 * 60 * 24 * 7;
    const now = new Date();
    const dateInPast = new Date(now.getTime() - (oneWeekInMs * weeksAgo));
    return dateInPast.getTime() < fileMetaData.lastModified.getTime();

}

async function seedCategories(override = false) {
    let categories = resources.NSECategories;
    for (let i = 0; i < categories.length; i++) {
        let fileMetaData = fileSystem.readFileMetaData("category",  categories[i].name);
        if (!override && fileMetaData && isFresh(fileMetaData, resources.ttl.categories)) {
            console.log("Skipping " + categories[i].name)
            continue;
        }
        let companies = await getCompanyNames(categories[i].URL);
        console.log(categories[i].name , companies)
        let result = {name: categories[i].name, company: companies}
        await fileSystem.save(result, "category", result.name)
    }
    await saveCategoryNames()
}

async function generateCategories(){
    const baseUrl = "https://www.nseindia.com/api/equity-stockIndices?index=";
    let text = fileSystem.readFile("constants/categories.json");
    return text
        .then((categories) => {
            let fileCategories = JSON.parse(categories);
            const indices = ["NIFTY 50"];
            indices.push(...fileCategories["Sectoral Indices"])
            return indices.reduce((acc, index) => {
                // console.log(index)
                const key = index.replace(/ /g, ''); // remove spaces from the index name
                 // encode the index name and append to the base URL
                acc[key] = baseUrl + encodeURIComponent(index);
                return acc;
            }, {});
        })

}

async function saveCategoryNames() {
    let categories = resources.NSECategories;
    let names = []
    for (let i = 0; i < categories.length; i++) {
        names[i] = categories[i].name
    }
    await fileSystem.save(names, "category", "CategoryNames")
}

module.exports = {seedCategories, generateCategories};