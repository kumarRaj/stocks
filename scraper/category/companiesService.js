const fileSystem = require("../fileSystem");
const scraper = require("../index")
const resources = require("../constants/resources");
const {isFresh} = require("../utils");

async function seedCompanies(override = false) {
    let files = fileSystem.readFileNamesFromDirectory("data");
    for (const file of files) {
        console.log("Fetching stock details for: " + file)
        let fileMetaData = fileSystem.readFileMetaData("data", file);
        if (!override && fileMetaData && isFresh(fileMetaData, resources.ttl.company)) {
            console.log("Skipping because the data probably hasn't changed for: " + file)
            continue;
        }
        try {
            await scraper.stockDetailsHandler(file);
        } catch (error) {
            console.log("Error saving stock details for: " + file)
        }
    }
}

module.exports = { seedCompanies };
