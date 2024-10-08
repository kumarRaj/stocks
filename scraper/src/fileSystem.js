const fs = require('fs');
const os = require('os');


async function save(data, additionalDirectory = '', fileName) {
    let baseDir = os.homedir() + "/stocks/"
    if (additionalDirectory !== '')
        baseDir = baseDir + additionalDirectory + '/'
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, {recursive: true})
    }

    fs.access(baseDir, fs.constants.F_OK, (err) => {
        if (err) {
            // parent does not exist, create it
            fs.mkdirSync(baseDir, {recursive: true});
        } else {
            // file exists, append to it
        }
    });

    fs.writeFile(baseDir + fileName, JSON.stringify(data), error => {
        if (error) {
            console.error(error)
        }
    })
}

// Should check if file exists, if not should not throw exception. Should return a date two years past
function readFileMetaData(additionalDirectory = '', fileName) {
    let baseDir = os.homedir() + "/stocks/";
    const filePath = baseDir + additionalDirectory + '/' + fileName;
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        
        const fileStats = fs.statSync(filePath);
        const lastModified = fileStats.mtime;
        return { filePath, lastModified, size: fileStats.size };
    } catch (err) {
        // If the file does not exist, return a date two years past
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        console.error(`[readFileMetaData] file not found, returning date two years past: ${twoYearsAgo}`);
        return { filePath, lastModified: twoYearsAgo };
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
    console.log(os.homedir())
    let baseDir = os.homedir() + "/stocks/"
    try {
        return fs.readdirSync(baseDir + directoryPath);
    } catch (err) {
        console.error(err);
        return [];
    }
}

module.exports = {save, readFileMetaData, readFile, readFileNamesFromDirectory};
