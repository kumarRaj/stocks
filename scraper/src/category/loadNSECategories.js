const path = require('path');
const resources = require('../constants/resources');
const fileSystem = require('../fileSystem');
const { isFresh, fetchWithTimeout } = require('../utils');

const constituentFiles = {
    'NIFTY 50': 'ind_nifty50list.csv',
    'NIFTY AUTO': 'ind_niftyautolist.csv',
    'NIFTY BANK': 'ind_niftybanklist.csv',
    'NIFTY ENERGY': 'ind_niftyenergylist.csv',
    'NIFTY FINANCIAL SERVICES': 'ind_niftyfinancialserviceslist.csv',
    'NIFTY FINANCIAL SERVICES 25/50': 'ind_niftyfinancialservices25-50list.csv',
    'NIFTY FMCG': 'ind_niftyfmcglist.csv',
    'NIFTY IT': 'ind_niftyitlist.csv',
    'NIFTY MEDIA': 'ind_niftymedialist.csv',
    'NIFTY METAL': 'ind_niftymetallist.csv',
    'NIFTY PHARMA': 'ind_niftypharmalist.csv',
    'NIFTY PSU BANK': 'ind_niftypsubanklist.csv',
    'NIFTY REALTY': 'ind_niftyrealtylist.csv',
    'NIFTY PRIVATE BANK': 'ind_niftyprivatebanklist.csv',
    'NIFTY HEALTHCARE INDEX': 'ind_niftyhealthcarelist.csv',
    'NIFTY CONSUMER DURABLES': 'ind_niftyconsumerdurableslist.csv',
    'NIFTY OIL & GAS': 'ind_niftyoilgaslist.csv',
};

const constituentBaseUrl = 'https://www.niftyindices.com/IndexConstituent/';

async function getCompanyNames(url) {
    const response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
            'Accept': 'text/csv, */*',
            'User-Agent': 'Mozilla/5.0',
        },
    });
    if (!response.ok) {
        throw new Error(`Constituent download failed with HTTP ${response.status}`);
    }

    const csv = (await response.text()).replace(/^\uFEFF/, '');
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error('Constituent CSV is empty');

    const headers = parseCsvRow(lines[0]).map(header => header.trim().toLowerCase());
    const symbolIndex = headers.indexOf('symbol');
    if (symbolIndex === -1) throw new Error('Constituent CSV has no Symbol column');

    const symbols = [...new Set(lines.slice(1)
        .map(line => parseCsvRow(line)[symbolIndex]?.trim())
        .filter(Boolean))];
    if (symbols.length === 0) throw new Error('Constituent CSV contains no stock symbols');
    return symbols;
}

function parseCsvRow(line) {
    const values = [];
    let value = '';
    let quoted = false;

    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];
        if (character === '"') {
            if (quoted && line[index + 1] === '"') {
                value += '"';
                index += 1;
            } else {
                quoted = !quoted;
            }
        } else if (character === ',' && !quoted) {
            values.push(value);
            value = '';
        } else {
            value += character;
        }
    }
    values.push(value);
    return values;
}

async function seedCategories(override = false) {
    const categories = await generateCategories();
    const availableCategories = [];
    const companyNames = new Set();
    const errors = [];
    let updated = 0;
    let skipped = 0;

    for (const [categoryName, nseUrl] of Object.entries(categories)) {
        const indexName = new URL(nseUrl).searchParams.get('index');
        const metadata = fileSystem.readFileMetaData('category', categoryName);
        let cachedError = null;
        if (!override && metadata && isFresh(metadata, resources.ttl.categories)) {
            try {
                await addStoredCompanies(metadata, categoryName, companyNames);
                availableCategories.push(categoryName);
                skipped += 1;
                continue;
            } catch (error) {
                cachedError = error;
            }
        }

        const fileName = constituentFiles[indexName];
        try {
            if (!fileName) throw new Error(`No constituent CSV is configured for ${indexName}`);
            const companies = await getCompanyNames(constituentBaseUrl + fileName);
            await fileSystem.save({ name: categoryName, company: companies }, 'category', categoryName);
            companies.forEach(company => companyNames.add(company));
            availableCategories.push(categoryName);
            updated += 1;
        } catch (error) {
            if (metadata) {
                try {
                    await addStoredCompanies(metadata, categoryName, companyNames);
                    availableCategories.push(categoryName);
                } catch (storedError) {
                    cachedError = storedError;
                }
            }
            errors.push({
                category: categoryName,
                message: cachedError
                    ? `${error.message}; cached category is unusable: ${cachedError.message}`
                    : error.message,
            });
        }
    }

    await saveCategoryNames([...new Set(availableCategories)]);
    return {
        total: Object.keys(categories).length,
        available: availableCategories.length,
        updated,
        skipped,
        companies: companyNames.size,
        companyNames: [...companyNames],
        failed: errors.length,
        errors,
    };
}

async function addStoredCompanies(metadata, categoryName, companyNames) {
    const contents = await fileSystem.readFile(metadata.filePath);
    if (!contents) throw new Error(`Could not read cached category ${categoryName}`);
    const category = JSON.parse(contents);
    if (!Array.isArray(category.company)) {
        throw new Error(`Cached category ${categoryName} has no company list`);
    }
    category.company.forEach(company => companyNames.add(company));
}

async function generateCategories() {
    const categoriesPath = path.join(__dirname, '../constants/categories.json');
    const text = await fileSystem.readFile(categoriesPath);
    if (!text) throw new Error(`Could not read category list at ${categoriesPath}`);

    const fileCategories = JSON.parse(text);
    const indices = ['NIFTY 50', ...(fileCategories['Sectoral Indices'] || [])];
    return indices.reduce((result, index) => {
        const key = index.replace(/[\s\\/:*?"<>|]/g, '');
        result[key] = `https://www.nseindia.com/api/equity-stockIndices?index=${encodeURIComponent(index)}`;
        return result;
    }, {});
}

async function saveCategoryNames(categories) {
    await fileSystem.save(categories, 'category', 'CategoryNames');
}

module.exports = { seedCategories, generateCategories };
