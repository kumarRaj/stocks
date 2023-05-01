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

function readFileMetaData(additionalDirectory = '', fileName) {
    let baseDir = os.homedir() + "/stocks/"

    const filePath =  baseDir + additionalDirectory + '/' + fileName
    try {
        fs.accessSync(filePath, fs.constants.F_OK);

        const fileStats = fs.statSync(filePath);
        const lastModified = fileStats.mtime;
        return { filePath, lastModified };
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {save, readFileMetaData};
