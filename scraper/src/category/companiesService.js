const fileSystem = require("../fileSystem");
const scraper = require("../index")
const resources = require("../constants/resources");
const {isFresh} = require("../utils");

async function seedCompanies(override = false, companies = []) {
    const files = [...new Set([
        ...companies,
        ...fileSystem.readFileNamesFromDirectory("data"),
    ])];
    const errors = [];
    let updated = 0;
    let skipped = 0;
    for (const file of files) {
        const fileMetaData = fileSystem.readFileMetaData("data", file);
        if (!override && fileMetaData && isFresh(fileMetaData, resources.ttl.company)) {
            const contents = await fileSystem.readFile(fileMetaData.filePath);
            try {
                const cachedCompany = JSON.parse(contents);
                const hasDetails = Object.keys(cachedCompany).some(key =>
                    key !== 'StockId' && key !== 'lastUpdatedAt'
                );
                if (hasDetails) {
                    skipped += 1;
                    continue;
                }
            } catch (error) {
                // Re-fetch malformed or incomplete cached files.
            }
        }
        try {
            console.log("Fetching stock details for: " + file)
            await scraper.stockDetailsHandler(file);
            updated += 1;
        } catch (error) {
            console.error("Error saving stock details for: " + file, error.message);
            errors.push({ stockId: file, message: error.message });
        }
    }
    return { total: files.length, updated, skipped, failed: errors.length, errors };
}

module.exports = { seedCompanies };
