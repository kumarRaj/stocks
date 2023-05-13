const assert = require('chai').assert;
const fileSystem = require('../fileSystem');
const scraper = require("../index");

describe('myapp', function() {
    it('should write file data to disk', async function () {
        await scraper.stockDetailsHandler("ADANIGREEN");
    });
});