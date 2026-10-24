import React, {useState} from 'react';

import {AppBar, Box, Button, Container, Paper, TextField, Toolbar, Typography} from '@mui/material';
import {seedThis} from '../../services/StockService';
import {StocksDetail} from "./StocksDetail";
import {getAllStockScores} from "../../services/ScoreService";


// @ts-ignore
export const Home = () => {
    let [stockScores, setStockScores] = useState<any[]>([]);
    let [searchStockId, setSearchStockId] = useState('');
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});
    let [isBreakdownVisible, toggleBreakdownVisible] = useState(false);

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
        toggleBreakdownVisible(true);
        });
    }


    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'background.default'}}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider'}}
            >
                <Container maxWidth="md">
                    <Toolbar disableGutters sx={{minHeight: 64, gap: 1.5}}>
                        <Box sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 18,
                            flexShrink: 0,
                        }}>
                            S
                        </Box>
                        <Typography sx={{fontWeight: 800, fontSize: 17}}>Stock Scores</Typography>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth="md" sx={{pt: 6}}>
                <Paper sx={{p: 2, borderRadius: 2, display: 'flex', gap: 1.5}}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Search stock"
                        variant="outlined"
                        onChange={setTextToSearch}
                        value={searchStockId}
                    />
                    <Button variant="contained" disableElevation onClick={addStock}>Add</Button>
                </Paper>
            </Container>
            <StocksDetail
                stockId={searchStockId}
                isBreakdownVisible={isBreakdownVisible}
                toggleBreakdownVisible={toggleBreakdownVisible}
                currentBreakdown={currentBreakdown}
            />
        </Box>
    );
}
