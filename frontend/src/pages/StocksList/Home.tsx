import React, {useState} from 'react';

import {Button, Grid, Paper, TextField} from '@mui/material';
import './StocksList.css';
import {seedThis} from '../../services/StockService';
import {StocksDetail} from "./StocksDetail";
import {getAllStockScores} from "../../services/ScoreService";


// @ts-ignore
export const Home = () => {
    let [stockScores, setStockScores] = useState<any[]>([]);
    let [searchStockId, setSearchStockId] = useState([]);
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});

    function setTextToSearch(event: any) {
        let textToSearch = event.target.value;
        setSearchStockId(textToSearch);
    }

    function addStock(event: any) {
        seedThis(`${searchStockId}`);
        getAllStockScores().then((stockScores: any) => {
            let data = stockScores.data;
            setStockScores(data);
            let currentStockData = data.filter((currentStock: any) => {
                let {stockId, scoreBreakdown, score} = currentStock;
                return searchStockId === stockId;
            });
            currentStockData && currentStockData[0] && setCurrentBreakdown(currentStockData[0].scoreBreakdown);
        });
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <div className='sector-container'>
                        <div className='menu-container'>
                            <div className='menu-item'>
                                <TextField label="Search Stock"
                                           variant="outlined"
                                           onChange={setTextToSearch}
                                           value={searchStockId}
                                /></div>
                            <div className='menu-item'>
                                <Button variant="contained" onClick={addStock}>Add</Button>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={12}>
                    <div className='stocks-container'>
                        <StocksDetail
                            stockId={searchStockId}
                            isBreakdownVisible={true}
                            toggleBreakdownVisible={true}
                            currentBreakdown={currentBreakdown}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
