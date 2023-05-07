const fileSystem = require("../fileSystem");
const scraper = require("../index")

async function seedCompanies() {
    let files = fileSystem.readFileNamesFromDirectory("data");
    for (const file of files) {
        console.log("Fetching stock details for: " + file)
        try {
            await scraper.stockDetailsHandler(file);
        } catch (error) {
            console.log("Error saving stock details for: " + file)
        }
    }
}

module.exports = { seedCompanies };
