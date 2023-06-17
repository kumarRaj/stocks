import React from 'react';

import {Button, Paper} from '@mui/material';
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
                    <p>PE Ratio: {currentBreakdown.pe}</p>
                    <p>Operating Profit Margin: {currentBreakdown.operatingProfitMargin}</p>
                    <p>Net Profit Margin: {currentBreakdown.netProfitMargin}</p>
                    <p>Borrowings: {currentBreakdown.borrowings}</p>
                    <p>Liabilities: {currentBreakdown.liabilities}</p>
                    <p>Revenue: {currentBreakdown.revenue}</p>
                    <p>LastUpdatedAt: {formattedDate(currentBreakdown.lastUpdatedAt)}</p>
                </div>}
                <p><Button onClick={() => handleSeedButton()}>Refresh</Button></p>
                <p><button onClick={() => toggleBreakdownVisible(false)}>Close</button></p>
                </Paper>}
        </div>
    );
}
