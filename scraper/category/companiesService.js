const fileSystem = require("../fileSystem");

function getCompanyNamesFromFileSystem() {
    return fileSystem.readFileNamesFromDirectory("data");
}

module.exports = { getCompanyNamesFromFileSystem };
