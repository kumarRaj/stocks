import React, { useEffect, useState } from 'react';
import { getAllSectors, getStocksBySector } from '../../services/SectorService';
import { getAllStockScores } from '../../services/ScoreService';
import { seed } from '../../services/StockService';

import {Grid, MenuItem, Select, TextField, Paper, Button} from '@mui/material';
import './StocksList.css';

export const StocksList: React.FC = () => {
    let [sectors, setSectors] = useState([]);
    let [stockScores, setStockScores] = useState([]);
    let [currentStocks, setCurrentStocks] = useState([]);
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});
    let [selectedStock, setSelectedStock] = useState('');
    let [isBreakdownVisible, toggleBreakdownVisible] = useState(false);
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

    const handleBreakdownToggle = (breakdown: any, selectedStockId: string) => {
        toggleBreakdownVisible(true);
        setCurrentBreakdown(breakdown);
        setSelectedStock(selectedStockId);
    }

    const handleSeedButton = () => {
        seed();
        console.log('seed button clicked')
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
                                        <MenuItem value={sector}> key={sector}
                                            {sector}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className='menu-container'>
                        <div className='menu-item'>
                            <Button variant="contained" onClick={handleSeedButton}>Seed</Button>
                        </div>
                        <div className='menu-item'><TextField label="Search Stock" variant="outlined" disabled /></div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={12} md={12}>
                <div className='stocks-container'>
                    {currentStocks.length === 0 
                        ? <p>No stocks in this category</p>
                        : currentStocks.map((currentStock: any) => {
                            let { stockId, scoreBreakdown, score } = currentStock;
                            return (
                                <Paper className='stock-item'>
                                    <div onClick={() => handleBreakdownToggle(scoreBreakdown, stockId)}>
                                        <p className='stock-caption'>{stockId}</p>
                                        <p>{score}</p>
                                    </div>
                                </Paper>
                            );
                        })
                    }
                </div>

                {isBreakdownVisible && <Paper className='stock-breakdown'>
                    <div>
                        <p>Breakdown for : {selectedStock}</p>
                        <p>PE Ratio: {currentBreakdown.pe}</p>
                        <p>Operating Profit Margin: {currentBreakdown.operatingProfitMargin}</p>
                        <p>Net Profit Margin: {currentBreakdown.netProfitMargin}</p>
                        <p>Borrowings: {currentBreakdown.borrowings}</p>
                        <p>Liabilities: {currentBreakdown.liabilities}</p>
                        <p>Revenue: {currentBreakdown.revenue}</p>

                        <button onClick={() => toggleBreakdownVisible(false)}>Close</button>
                    </div>
                </Paper>}
            </Grid>
        </Grid >

    );
}
