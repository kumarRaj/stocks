import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSectors, getStocksBySector } from '../../services/SectorService';
import { getAllStockScores } from '../../services/ScoreService';
import { seed } from '../../services/StockService';

import {Grid, MenuItem, Select, TextField, Paper, Button} from '@mui/material';
import './StocksList.css';
import {StocksDetail} from "./StocksDetail";

export const StocksList: React.FC = () => {
    const navigate = useNavigate();
    let [sectors, setSectors] = useState<string[]>([]);
    let [searchStockId, setSearchStockId] = useState([]);
    let [stockScores, setStockScores] =  useState<any[]>([]);
    let [currentStocks, setCurrentStocks] = useState<any[]>([]);
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});
    let [selectedStock, setSelectedStock] = useState('');
    let [isBreakdownVisible, toggleBreakdownVisible] = useState(false);
    let [currentSector, setCurrentSector] = useState('');
    let [isSeeding, setIsSeeding] = useState(false);
    let [seedMessage, setSeedMessage] = useState('');

    // on component mount
    useEffect(() => {
        Promise.all(
            [
                getAllSectors(),
                getAllStockScores()
            ]
        ).then(response => {
            let [sectors, stockScores] = response;
            const sectorsData = sectors.data;
            const withAll = [...sectorsData, 'ALL'];
            setSectors(withAll);
            setStockScores(stockScores.data);
            setCurrentSector(sectorsData.includes('NIFTY 50') ? 'NIFTY 50' : withAll[0]);
        });
    }, []);

    useEffect(() => {
        if (!currentSector) return;
        if (currentSector === 'ALL') {
            setCurrentStocks([...stockScores]);
            return;
        }
        getStocksBySector(currentSector)
            .then(response => {
                let companies = response.data.company;
                if (!response.data)
                    companies = stockScores.map((stock: any) => stock.stockId);
                setCurrentStocks(filterStocksBasedOnCurrentSector(stockScores, companies));
            })
    }, [currentSector, stockScores]);

    const filterStocksBasedOnCurrentSector = (stockScores: any, stocksBySector: any) => {
        return stockScores.filter((stock: any) => stocksBySector.includes(stock.stockId));
    }

    const handleSectorChange = (event: any) => {
        setSearchStockId([]);
        setCurrentSector(event.target.value);
    }

    const handleBreakdownToggle = (breakdown: any, selectedStockId: string) => {
        navigate(`/${selectedStockId}`)
        toggleBreakdownVisible(true);
        setCurrentBreakdown(breakdown);
        setSelectedStock(selectedStockId);
    }

    const handleSeedButton = async () => {
        setIsSeeding(true);
        setSeedMessage('Fetching categories and stock details…');
        try {
            const response = await seed();
            const [sectorsResponse, scoresResponse, stocksResponse] = await Promise.all([
                getAllSectors(),
                getAllStockScores(),
                getStocksBySector(currentSector),
            ]);
            const sectorsData = sectorsResponse.data || [];
            setSectors([...sectorsData, 'ALL']);
            const scores = scoresResponse.data || [];
            setStockScores(scores);
            setCurrentStocks(currentSector === 'ALL'
                ? scores
                : filterStocksBasedOnCurrentSector(
                    scores,
                    stocksResponse.data?.company || [],
                ));

            const result = response.data;
            if (result.stocks?.aborted) {
                setSeedMessage(`Seed stopped after rate limits: ${result.stocks.abortReason}. ${result.stocks.updated} updated, ${result.stocks.unattempted} not attempted. Try again later.`);
                return;
            }
            const failures = result.categories.failed + result.stocks.failed;
            setSeedMessage(result.success
                ? `Seed complete: ${result.categories.available} categories and ${result.stocks.updated} stocks updated.`
                : `Seed finished with ${failures} errors. ${result.stocks.updated} stocks updated.`);
        } catch (error) {
            const responseError = (error as any)?.response?.data?.error;
            const message = typeof responseError === 'string'
                ? responseError
                : responseError?.message || (error as any)?.message || 'Seed failed.';
            setSeedMessage(`Seed failed: ${message}`);
        } finally {
            setIsSeeding(false);
        }
    }

    function handleSearch(event:any) {
        let textToSearch = event.target.value;
        setSearchStockId(textToSearch);
        let stocksToSearch = textToSearch.split(',');
        const result: any[] = []
        stocksToSearch.forEach((stockToSearch: any) => {
            result.push(...stockScores.filter((stock: any) => (stock.stockId.includes(stockToSearch.trim().toUpperCase()))));
        });
        setCurrentStocks([...result.sort((a: any, b: any) => b.score - a.score)]);
    }
    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <div className='sector-container'>
                    <div className='sector-selector-main'>
                        <p>Sectors:</p>
                        <Select
                            key={'sector-selector'}
                            value={currentSector}
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
                            <Button variant="contained" onClick={handleSeedButton} disabled={isSeeding}>
                                {isSeeding ? 'Seeding…' : 'Seed'}
                            </Button>
                            {seedMessage && <span role="status" aria-live="polite">{seedMessage}</span>}
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
                <div className='stocks-container' key={currentStocks.length}>
                    {currentStocks.map((currentStock: any) => {
                        let {stockId, scoreBreakdown, score} = currentStock;
                        return (
                            <Paper onClick={() => handleBreakdownToggle(scoreBreakdown, stockId)} key={stockId}
                                   className='stock-item'>
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
