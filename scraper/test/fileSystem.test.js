const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stocks-data-'));
fs.mkdirSync(path.join(dataDir, 'data'), { recursive: true });
process.env.STOCKS_DATA_DIR = dataDir;

const fileSystem = require('../src/fileSystem');

describe('myapp', function() {
    it('should read all companies from path', function() {
        const expected = []

        const result = fileSystem.readFileNamesFromDirectory("data")
        console.log("result", result)
        assert.deepStrictEqual(result, expected, "should fail")
    });
});
