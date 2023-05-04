const axios = require('axios');
const resources = require('../constants/resources')
const fileSystem = require("../fileSystem")
const dateFormat = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
};


async function getCompanyNames(url) {
    let initialres = await axios.get('https://www.nseindia.com/')
        .catch((err) => console.log('[initial call] error calling the nseindia site initially:', err));

    const options = {
        headers: {
            'Cookie': (initialres.headers)['set-cookie']
        }
    }
    let finalres = await axios.get(url, options)
        .catch((err) => console.log("[second call] second call to nseindia fails:", err));

    companies = finalres.data?.data;
    companyNames = companies.map(company => company.symbol);
    return companyNames;
}

function isFresh(fileMetaData, ttl) {
    const weeksAgo = parseInt(ttl.split("w")[0]);
    const oneWeekInMs = 1000 * 60 * 60 * 24 * 7;
    const now = new Date();
    const dateInPast = new Date(now.getTime() - (oneWeekInMs * weeksAgo));
    return dateInPast.getTime() < fileMetaData.lastModified.getTime();
}

async function seedCategories(override = false) {
    let categoriesPromise = generateCategories()
    categoriesPromise.then((categories) => {
        for (const name in categories) {
            console.log("Processing " + name)
            let fileMetaData = fileSystem.readFileMetaData("category", name);
            if (!override && fileMetaData && isFresh(fileMetaData, resources.ttl.categories)) {
                console.log("Skipping because the data probably hasn't changed for: " + name)
                continue;
            }
            let url = categories[name];
            getCompanyNames(url).then((companies) => {
                let result = { name: name, company: companies }
                fileSystem.save(result, "category", result.name)
            })
        }
        saveCategoryNames(categories)
    })
}

async function generateCategories() {
    const baseUrl = "https://www.nseindia.com/api/equity-stockIndices?index=";
    let text = fileSystem.readFile("constants/categories.json");
    return text
        .then((categories) => {
            let fileCategories = JSON.parse(categories);
            const indices = ["NIFTY 50"];
            indices.push(...fileCategories["Sectoral Indices"])
            return indices.reduce((acc, index) => {
                // console.log(index)
                const key = index.replace(/ /g, '') // remove spaces from the index name
                    .replace(/[\\/:*?"<>|]/g, ''); // remove special characters from the index name
                acc[key] = baseUrl + encodeURIComponent(index); // encode the index name and append to the base URL
                return acc;
            }, {});
        })

}

async function saveCategoryNames(categories) {
    await fileSystem.save(Object.keys(categories), "category", "CategoryNames")
}

module.exports = { seedCategories, generateCategories };