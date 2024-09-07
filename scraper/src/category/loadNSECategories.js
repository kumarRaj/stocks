const { json } = require('express/lib/response');
const resources = require('../constants/resources');
const fileSystem = require("../fileSystem");
const { isFresh, fetchWithTimeout, fetchJsonWithTimeout } = require("../utils");
let cookie = ''

const requestOptions = {
    method: "GET",
    redirect: "follow"
    // signal: AbortSignal.timeout(5000)
};

async function getCompanyNames(url) {    
    let initialres;
    try {
        if (cookie == ''){
            initialres = await fetchWithTimeout("https://www.nseindia.com/", requestOptions);
            cookie = initialres.headers.get('set-cookie')
            console.log(cookie)
            console.log("Got headers successfully. Using cookie from here");
        }
        else {
            console.log("Using cookie from previous call")
        }
        
    } catch (err) {
        const exception = `[initial call] error: ${err.message || 'An unknown error occurred'}`;
        console.error(exception);
        throw exception
    }

    const options = {
        headers: {
            'Cookie': cookie
        },
        ...requestOptions
    };

    console.log("Calling at: " + url);
    const finalres = await fetchJsonWithTimeout(url, options);
    const companies = await finalres.json()?.data;
    const companyNames = companies.map(company => company.symbol);
    console.log(`Got company names ${companyNames}`);
    return companyNames;
    // const message = "[second call] second call to nseindia fails:" + err.message
    // console.error(message);
}

async function createCompanyFiles(companies) {
    console.log("Creating files for " + companies);
    for (const company of companies) {
        await fileSystem.save({ 'StockId': company }, "data", company);
    }
}

async function seedCategories(override = false) {
    let categories = await generateCategories();

    for (const name in categories) {
        let fileMetaData = fileSystem.readFileMetaData("category", name);
        if (!override && fileMetaData && isFresh(fileMetaData, resources.ttl.categories)) {
            console.log("Skipping because the data probably hasn't changed for: " + name);
            continue;
        }
        let url = categories[name];
        try {
            let companies = await getCompanyNames(url);
            let result = { name: name, company: companies };
            fileSystem.save(result, "category", result.name);
            createCompanyFiles(companies);    
        } catch (error) {

            console.log(`Error while getting data for ${name} in ${url}`, error.message)
        }
    }
    saveCategoryNames(categories);
}

async function generateCategories() {
    const baseUrl = "https://www.nseindia.com/api/equity-stockIndices?index=";
    let text = await fileSystem.readFile("src/constants/categories.json");
    let fileCategories = JSON.parse(text);

    const indices = ["NIFTY 50"];
    indices.push(...fileCategories["Sectoral Indices"]);
    console.log("indices", indices);
    return indices.reduce((acc, index) => {
        // console.log(index)
        const key = index.replace(/[\\/:*?"<>|]/g, ''); // remove special characters from the index name
        acc[key] = baseUrl + encodeURIComponent(index); // encode the index name and append to the base URL
        return acc;
    }, {});
}

async function saveCategoryNames(categories) {
    await fileSystem.save(Object.keys(categories), "category", "CategoryNames");
}

module.exports = { seedCategories, generateCategories };
