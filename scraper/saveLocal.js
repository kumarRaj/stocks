const fs = require('fs');
const os = require('os');

async function save(data, additionalDirectory = '', fileName){
    let pathToSave = os.homedir()+"/stocks/"

    if(additionalDirectory !== '')
        pathToSave = pathToSave + additionalDirectory+'/'

    if(!fs.existsSync(pathToSave)){
        fs.mkdirSync(pathToSave, { recursive: true })
    }
    
    fs.writeFile(pathToSave+fileName, JSON.stringify(data), error => {
        if (error) {
        console.error(error)
        return
        }
    })
}

module.exports = {save};