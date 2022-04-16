# Stocks Application

## Start Application

```
docker compose up --build
```

## REST API
### backend(Port : 8081)
| REST METHOD   |      API      | Functionality |
|:----------:|:-------------|:------|
| GET |  /stock/categories/{category} | Fetch comapanies present in a category |
| POST |  /stock/categories/{category} | Load comapany details present in the category |
| GET |  /stock/categories/ | Fetch category names |
| POST | /stock/categories/loadData |  Load comapany details present in the all the categories |
| GET |  /stock/{stockId} | Fetch stock details for the given stock ID |
| GET |  /stock/{stockId}/score | Fetch score of given stock ID |
| GET |  /stock/scores | Fetch score of all companies present in DB |

### scraper(Port : 9000)
| REST METHOD   |      API      | Functionality |
|:----------:|:-------------|:------|
| POST |  /stockDetails?stcokID={stockId} | Load data of given stockID |



## Docker commands

Docker for backend
``` 
cd backend 
docker build -t stocks-backend . 
docker run -dp 8081:8081 stocks-backend
docker tag stocks-backend:latest sunandanbose/stocks-backend:latest
docker push
```

Docker for Scraper
``` 
cd scraper 
docker build -t scraper . 
docker run -dp 8081:8081 scraper
docker tag scraper:latest sunandanbose/scraper:latest
docker push
```


Run docker image in local system
```
docker run -dp 8081:8081 stocks-backend
docker run -dp 9000:9000 scraper
```



## Features

- First Page is for stock list

- Stock Analysis
- Second page is for checklist with comments

## TODO
- Get an API that gives us this data
- Parse it
- calculate and display below scores 

peRatio [tick] [negative] [50] [Comments]




P/E ratio

1 - 20 - 5pts

80 - 100 - 1pts


Operating profit margin

Primary business earnings - cost in primary business


Net profit margin = Total Earnings - Total Cost

Score for net and operating

if profit is more than previous year +1 and profit is less than previous year -1

Dividend - The dividend is always declared by the company on the face value (FV) of a share irrespective of its market value. The rate of dividend is expressed as a percentage of the face value of a share per annum.

find percentage of dividend with market share price and if it falls above 10 % give it score from 1 to 5

Debt (Loan)


Debt/Revenue

if debt and revenue both increase - OK
if debt increases and revenue does not - BAD
if debt decreases and revenue increases - GOOD

Reducing debt to revenue means a good score for the company 

Profit

If increasing then good

Reserves

Same as profit

Cash flow 

Same as profit (Preferably positive)

ROE??

Price in the last one year 

Is it downward - upward means 
