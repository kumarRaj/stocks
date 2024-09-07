const assert = require('chai').assert;
const fileSystem = require('../src/fileSystem');
const scraper = require("../src/index");

describe('myapp', function() {
    it('should write file data to disk', async function () {
        await scraper.stockDetailsHandler("ADANIGREEN");
    });
});