import React, { useEffect, useState } from 'react';
import { getAllSectors, getStocksBySector } from '../../services/SectorService';
import { getAllStockScores } from '../../services/ScoreService';
import { seed } from '../../services/StockService';

import {Grid, MenuItem, Select, TextField, Paper, Button} from '@mui/material';
import './StocksList.css';
import {StocksDetail} from "./StocksDetail";

export const StocksList: React.FC = () => {
    let [sectors, setSectors] = useState([]);
    let [searchStockId, setSearchStockId] = useState([]);
    let [stockScores, setStockScores] =  useState<any[]>([]);
    let [currentStocks, setCurrentStocks] = useState<any[]>([]);
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
            const sectorsData = sectors.data;
            sectorsData.push('ALL')
            setSectors(sectorsData);
            setStockScores(stockScores.data);
            setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores.data, stocksBySector.data.company));
        });
    }, []);

    useEffect(() => {
        getStocksBySector(currentSector)
            .then(response => {
                let companies = response.data.company;
                if (!response.data)
                    companies = stockScores.map((stock: any) => stock.stockId);
                setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores, companies));
            })
    }, [currentSector]);

    const filterStocksBasedOnCurrentSector = (stockScores: any, stocksBySector: any) => {
        return stockScores.filter((stock: any) => stocksBySector.includes(stock.stockId));
    }

    const handleSectorChange = (event: any) => {
        setSearchStockId([]);
        setCurrentSector(event.target.value);
    }

    const handleBreakdownToggle = (breakdown: any, selectedStockId: string) => {
        toggleBreakdownVisible(true);
        setCurrentBreakdown(breakdown);
        setSelectedStock(selectedStockId);
    }

    const handleSeedButton = () => {
        seed();
    }

    function handleSearch(event:any) {
        let textToSearch = event.target.value;
        setSearchStockId(textToSearch);
        let stocksToSearch = textToSearch.split(',');
        const result: any[] = []
        stocksToSearch.forEach((stockToSearch: any) => {
            result.push(...stockScores.filter((stock: any) => (stock.stockId.includes(stockToSearch.trim().toUpperCase()))));
        });
        console.log(result);
        setCurrentStocks(result.sort((a: any, b: any) => b.score - a.score));
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
                                        <MenuItem key={sector} value={sector}>
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
                        <div className='menu-item'>
                            <TextField style={{ backgroundColor: 'whiteSmoke' }} label="Search Stock" variant="outlined"
                                                              onChange={handleSearch}
                                                              value={searchStockId}
                        /></div>
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
                                <Paper onClick={() => handleBreakdownToggle(scoreBreakdown, stockId)} key={stockId} className='stock-item'>
                                    <div>
                                        <p className='stock-caption'>{stockId}</p>
                                        <p>{score}</p>
                                    </div>
                                </Paper>
                            );
                        })
                    }
                </div>
                <StocksDetail
                    stockId={selectedStock}
                    isBreakdownVisible={isBreakdownVisible}
                    toggleBreakdownVisible={toggleBreakdownVisible}
                    currentBreakdown={currentBreakdown}
                />
            </Grid>
        </Grid >

    );
}
