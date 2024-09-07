const assert = require('chai').assert;
const categories = require('../src/category/loadNSECategories');

describe('myapp', function() {
    it('should read categories from constant categories', function() {
        const expected = {
            "NIFTY50": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050",
            "NIFTYAUTO": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20AUTO",
            "NIFTYBANK": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20BANK",
            "NIFTYCONSUMERDURABLES": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20CONSUMER%20DURABLES",
            "NIFTYENERGY": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20ENERGY",
            "NIFTYFINANCIALSERVICES": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20FINANCIAL%20SERVICES",
            "NIFTYFINANCIALSERVICES2550": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20FINANCIAL%20SERVICES%2025%2F50",
            "NIFTYFMCG": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20FMCG",
            "NIFTYHEALTHCAREINDEX": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20HEALTHCARE%20INDEX",
            "NIFTYIT": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20IT",
            "NIFTYMEDIA": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20MEDIA",
            "NIFTYMETAL": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20METAL",
            "NIFTYOIL&GAS": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20OIL%20%26%20GAS",
            "NIFTYPHARMA": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20PHARMA",
            "NIFTYPRIVATEBANK": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20PRIVATE%20BANK",
            "NIFTYPSUBANK": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20PSU%20BANK",
            "NIFTYREALTY": "https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20REALTY"
        }

        return categories.generateCategories()
            .then((result) => {
                console.log("result", result)
                assert.deepStrictEqual(expected, result, "should fail")
            })
    });
});