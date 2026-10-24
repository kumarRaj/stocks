const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();
const scraper = require("./index")
const categories = require("./category/loadNSECategories")
const peerInfo = require("./peerInfo");
const peInfo = require("./peInfo");
const {seedCompanies} = require("./category/companiesService");

app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Stock Scraper API",
            version: "1.0.0",
            description: "API documentation for the Stock Scraper application",
        },
        servers: [
            {
                url: "/",
            },
        ],
    },
    apis: [path.join(__dirname, "**/*.js")],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @openapi
 * /ping:
 *   get:
 *     summary: Check that the scraper service is running
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: ok
 */
app.get('/ping', function (req, res) {
    res.end("ok");
})

/**
 * @openapi
 * /stockDetails:
 *   post:
 *     summary: Fetch stock details
 *     description: Fetch details for the stock IDs in the request body and optional stockId query parameter.
 *     parameters:
 *       - in: query
 *         name: stockId
 *         required: false
 *         description: Stock ID to fetch details for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *           example: ["ADANIGREEN", "INFY"]
 *     responses:
 *       200:
 *         description: Stock details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   stockId:
 *                     type: string
 *                   message:
 *                     type: string
 */
app.post('/stockDetails', async function (req, res) {
    const stockId = req.query.stockId;
    let stocks = new Set()
    stockId && stocks.add(stockId)
    const requestBody = req.body || []
    requestBody.forEach(item => stocks.add(item))
    const failedStocks = []
    for (const stockId of stocks) {
        try {
            await scraper.stockDetailsHandler(stockId)
        } catch (error) {
            failedStocks.push({
                stockId: stockId,
                message: error.message,
            })
        }
    }

    res.status(200);
    res.json(failedStocks);
})


/**
 * @openapi
 * /stock/peers:
 *   post:
 *     summary: Fetch peer information for a stock
 *     parameters:
 *       - in: query
 *         name: stockId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Peer information fetched successfully
 *       500:
 *         description: Peer information could not be fetched
 */
app.post('/stock/peers', async function (req, res) {
    const stockId = req.query.stockId;
    try {
        if (stockId) {
            await peerInfo.fetchPeers(stockId);
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId: stockId,
                message: error.message,
            },
        });
    }
})


/**
 * @openapi
 * /stock/pe:
 *   post:
 *     summary: Fetch the price to earnings ratio for a stock
 *     parameters:
 *       - in: query
 *         name: stockId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price to earnings data fetched successfully
 *       500:
 *         description: Price to earnings data could not be fetched
 */
app.post('/stock/pe', async function (req, res) {
    const stockId = req.query.stockId;
    try {
        if (stockId) {
            await peInfo.fetchPE(stockId);
        }
        res.end()
    } catch (error) {
        res.status(error.status || 500);
        res.json({
            error: {
                stockId: stockId,
                message: error.message,
            },
        });
    }
})


/**
 * @openapi
 * /stock/seed:
 *   post:
 *     summary: Seed stock categories and companies
 *     responses:
 *       200:
 *         description: Seeding finished; the response includes updated, skipped, and failed counts.
 *       502:
 *         description: No stock categories could be loaded from Nifty Indices.
 */
app.post('/stock/seed', async function (req, res) {
    try {
        console.log("Seeding all categories")
        const categorySummary = await categories.seedCategories(false)
        console.log("Seeding all companies")
        const companySummary = await seedCompanies(false, categorySummary.companyNames)
        const summary = {
            success: categorySummary.failed === 0 && companySummary.failed === 0 && companySummary.aborted !== true,
            aborted: companySummary.aborted === true,
            categories: {
                total: categorySummary.total,
                available: categorySummary.available,
                updated: categorySummary.updated,
                skipped: categorySummary.skipped,
                companies: categorySummary.companies,
                failed: categorySummary.failed,
                errors: categorySummary.errors,
            },
            stocks: companySummary,
        }

        if (categorySummary.available === 0) {
            return res.status(502).json({
                error: 'No stock categories could be loaded from Nifty Indices.',
                summary,
            })
        }
        res.json(summary)
    } catch (error) {
        res.status(error.status || 500).json({
            error: {
                message: error.message,
            },
        });
    }
})


const server = app.listen(9000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("Scraper app listening on http://%s:%s", host, port)
});
