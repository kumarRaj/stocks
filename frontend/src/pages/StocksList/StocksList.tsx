import React, { useEffect, useState } from 'react';
import { getAllSectors, getStocksBySector } from '../../services/SectorService';
import { getAllStockScores } from '../../services/ScoreService';

import { Grid, MenuItem, Select, TextField, Paper } from '@mui/material';
import './StocksList.css';

export const StocksList: React.FC = () => {
    let [sectors, setSectors] = useState([]);
    let [stockScores, setStockScores] = useState([]);
    let [currentStocks, setCurrentStocks] = useState([]);
    let [currentSector, setCurrentSector] = useState('NIFTY50');

    // on component mount
    useEffect(() => {
        Promise.all(
            [
                getAllSectors(),
                getAllStockScores(),
                getStocksBySector(currentSector)
            ]
        ).then(response => {
            let [sectors, stockScores, stocksBySector] = response;
            setSectors(sectors.data);
            setStockScores(stockScores.data);
            setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores.data, stocksBySector.data.company));
        });
    }, []);

    useEffect(() => {
        getStocksBySector(currentSector)
            .then(response => {
                let companies = response.data.company;
                setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores, companies));
            })
    }, [currentSector]);

    const filterStocksBasedOnCurrentSector = (stockScores: any, stocksBySector: any) => {
        return stockScores.filter((stock: any) => stocksBySector.includes(stock.stockId));
    }

    const handleSectorChange = (event: any) => {
        setCurrentSector(event.target.value);
    }

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <div className='sector-container'>
                    <div className='sector-selector-main'>
                        <p>Sectors:</p>
                        <Select
                            key={'sector-selector'}
                            defaultValue={currentSector ?? ' '}
                            onChange={handleSectorChange}
                            className='sector-selector'
                        >
                            {
                                sectors.map(sector => {
                                    return (
                                        <MenuItem value={sector}>
                                            {sector}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>

                    <TextField className='stock-search' label="Search Stock" variant="outlined" disabled />
                </div>
            </Grid>

            <Grid item xs={12} md={12}>
                <div className='stocks-container'>
                    {
                        currentStocks.map((currentStock: any) => {
                            let { stockId, scoreBreakdown, score } = currentStock;
                            return (
                                <Paper className='stock-item'>
                                        <div>
                                            <p className='stock-caption'>{stockId}</p>
                                            <p>{score}</p>
                                        </div>
                                        {/* <div>
                                            <p>Breakdown:</p>
                                            <p>Borrowings: {scoreBreakdown.borrowings}</p>
                                            <p>Liabilities: {scoreBreakdown.liabilities}</p>
                                            <p>Net Profit Margin: {scoreBreakdown.netProfitMargin}</p>
                                            <p>Operating Profit Margin: {scoreBreakdown.operatingProfitMargin}</p>
                                            <p>PE Ratio: {scoreBreakdown.pe}</p>
                                            <p>Revenue: {scoreBreakdown.revenue}</p>
                                        </div> */}
                                </Paper>
                            );
                        })
                    }
                </div>
            </Grid>
        </Grid >

    );
}
