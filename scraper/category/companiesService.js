const fileSystem = require("../fileSystem");
const scraper = require("../index")

async function seedCompanies() {
    let files = fileSystem.readFileNamesFromDirectory("data");
    for (const file of files) {
        console.log("Fetching stock details for: " + file)
        await scraper.stockDetailsHandler(file);
    }
}

module.exports = { seedCompanies };
