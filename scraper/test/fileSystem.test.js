const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fileSystem = require('../src/fileSystem');

describe('myapp', function() {
    it('should read all companies from path', function() {
        const expected = []

        return fileSystem.readFileNamesFromDirectory("data")
            .then((result) => {
                console.log("result", result)
                assert.deepStrictEqual(result, expected, "should fail")
            })
    });
});
