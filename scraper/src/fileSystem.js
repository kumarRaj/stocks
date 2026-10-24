const fs = require('fs');
const os = require('os');
const path = require('path');

const dataRoot = path.resolve(process.env.STOCKS_DATA_DIR || path.join(os.homedir(), 'stocks'));

async function save(data, additionalDirectory = '', fileName) {
    const directory = path.join(dataRoot, additionalDirectory);
    await fs.promises.mkdir(directory, { recursive: true });
    await fs.promises.writeFile(path.join(directory, fileName), JSON.stringify(data));
}

// Return null for a file that has not been seeded yet.
function readFileMetaData(additionalDirectory = '', fileName) {
    const filePath = path.join(dataRoot, additionalDirectory, fileName);
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        
        const fileStats = fs.statSync(filePath);
        const lastModified = fileStats.mtime;
        return { filePath, lastModified, size: fileStats.size };
    } catch (err) {
        if (err.code === 'ENOENT') return null;
        throw err;
    }
}

async function readFile(filePath) {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const fileStats = fs.statSync(filePath);
        const lastUpdated = fileStats.mtime;
        console.log(`File last updated: ${lastUpdated}`);
        return fileContents;
    } catch (err) {
        console.error(err);
        return null;
    }
}

function readFileNamesFromDirectory(directoryPath) {
    try {
        return fs.readdirSync(path.join(dataRoot, directoryPath));
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        console.error(err);
        throw err;
    }
}

module.exports = {save, readFileMetaData, readFile, readFileNamesFromDirectory};
