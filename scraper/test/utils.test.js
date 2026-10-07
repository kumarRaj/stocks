const { describe, it } = require('node:test');
const scraper = require("../src/index");

describe('myapp', function() {
    it('should write file data to disk', async function () {
        await scraper.stockDetailsHandler("ADANIGREEN");
    });
});
