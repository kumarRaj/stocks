const resources = require('../constants/resources');
const fileSystem = require("../fileSystem");
const { isFresh } = require("../utils");

async function getCompanyNames(url) {    
    let initialres;
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    try {
        initialres = await fetch("https://www.nseindia.com/", requestOptions);
        console.log(initialres.headers);
    } catch (err) {
        console.error(`[initial call] error: ${err.message || 'An unknown error occurred'}`);
    }

    const options = {
        method: "GET",
        headers: {
            'Cookie': initialres.headers.get('set-cookie')
        }
    };

    let finalres;
    try {
        finalres = await fetch(url, options);
    } catch (err) {
        console.log("[second call] second call to nseindia fails:", err);
    }

    const data = await finalres.json();
    let companies = data?.data;
    let companyNames = companies.map(company => company.symbol);
    return companyNames;
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
        console.log("Processing " + name + " at: " + url);
        let companies = await getCompanyNames(url);

        console.log("Got following companies", companies);
        let result = { name: name, company: companies };
        fileSystem.save(result, "category", result.name);
        createCompanyFiles(companies);
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
