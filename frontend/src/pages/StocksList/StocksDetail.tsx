import React from 'react';

import {Button, Paper, Tooltip, Typography} from '@mui/material';
import './StocksList.css';
import {seedThis} from '../../services/StockService';

// @ts-ignore
export const StocksDetail = ({isBreakdownVisible, currentBreakdown, stockId, toggleBreakdownVisible}) => {

    const handleSeedButton = () => {

        seedThis(`${stockId}`);
        console.log(`seed button clicked for ${stockId}`)
    }

    function formattedDate(date: string): string {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        // @ts-ignore
        return date && new Date(Date.parse(date)).toLocaleDateString('en-US', options);
    }

    return (
        <div>
            {isBreakdownVisible && <Paper className='stock-breakdown'>
                <div>
                    <p>Score breakdown for : <a href={`https://www.screener.in/company/${stockId}/consolidated/`}
                                          target="_blank">{stockId}</a></p>
                </div>
                {!currentBreakdown && <div>
                    <p>Data not available</p>
                </div>
                }
                {currentBreakdown && <div>
                    <Typography component="p">
                        <Tooltip title="We have a dumb pe calculation at the moment. 0-20 is 5, 21 - 40 is 4 and so on. Ridiculously dumb, I know." arrow>
                            <Typography component="span">PE Ratio: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.pe}</Typography>
                    </Typography>
                    <Typography component="p">
                        <Tooltip title="Operating Profit Margin is a profitability ratio that shows the percentage of profit a company generates from its operations, before interest and taxes.">
                            <Typography component="span">Operating Profit Margin: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.operatingProfitMargin}</Typography>
                    </Typography>

                    <Typography component="p">
                        <Tooltip title="Net Profit Margin indicates the percentage of profit a company makes from its total revenue after deducting all expenses including taxes and interest.">
                            <Typography component="span">Net Profit Margin: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.netProfitMargin}</Typography>
                    </Typography>

                    <Typography component="p">
                        <Tooltip title="Borrowings refer to the money that a company has borrowed, usually in the form of loans or debt securities.">
                            <Typography component="span">Borrowings: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.borrowings}</Typography>
                    </Typography>

                    <Typography component="p">
                        <Tooltip title="Liabilities represent a company's legal debts that they can pay over a longer period of time.">
                            <Typography component="span">Liabilities: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.liabilities}</Typography>
                    </Typography>

                    <Typography component="p">
                        <Tooltip title="Reserves typically refer to a company's retained earnings or profits that have been set aside and not distributed as dividends.">
                            <Typography component="span">Reserves: </Typography>
                        </Tooltip>
                        <Typography component="span">{currentBreakdown.reserves}</Typography>
                    </Typography>
                    <p>Updated At: {formattedDate(currentBreakdown.lastUpdatedAt)}</p>
                </div>}
                <p><Button onClick={() => handleSeedButton()}>Refresh</Button></p>
                <p><button onClick={() => toggleBreakdownVisible(false)}>Close</button></p>
                </Paper>}
        </div>
    );
}
