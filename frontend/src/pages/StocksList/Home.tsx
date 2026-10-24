import React, {useState} from 'react';

import {AppBar, Alert, Box, Button, Container, Paper, TextField, Toolbar, Typography} from '@mui/material';
import {seedThese} from '../../services/StockService';
import {StocksDetail} from "./StocksDetail";
import {getAllStockScores} from "../../services/ScoreService";


// @ts-ignore
export const Home = () => {
    let [stockScores, setStockScores] = useState<any[]>([]);
    let [searchStockId, setSearchStockId] = useState('');
    let [addedStockIds, setAddedStockIds] = useState<string[]>([]);
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});
    let [isBreakdownVisible, toggleBreakdownVisible] = useState(false);
    let [seedFailures, setSeedFailures] = useState<any[]>([]);

    function setTextToSearch(event: any) {
        let textToSearch = event.target.value;
        setSearchStockId(textToSearch);
    }

    function addStock(event: any) {
        const stockIds = searchStockId.split(/[\s,]+/).filter(Boolean)
            .filter((stockId, index, all) => all.indexOf(stockId) === index);
        if (!stockIds.length) return;
        seedThese(stockIds)
            .then((response: any) => {
                setSeedFailures(Array.isArray(response.data) ? response.data : []);
                return getAllStockScores();
            })
            .then((response: any) => {
                let data = response.data;
                setStockScores(data);
                setAddedStockIds(stockIds);
                let matchedStocks = data.filter((currentStock: any) => stockIds.includes(currentStock.stockId));
                setCurrentBreakdown(matchedStocks[0]?.scoreBreakdown);
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
                        label="Search stocks"
                        helperText="Separate multiple tickers with commas or spaces"
                        variant="outlined"
                        onChange={setTextToSearch}
                        value={searchStockId}
                    />
                    <Button variant="contained" disableElevation onClick={addStock}>Add</Button>
                </Paper>
                {seedFailures.length > 0 && (
                    <Alert
                        severity="warning"
                        sx={{mt: 1.5, borderRadius: 2}}
                        onClose={() => setSeedFailures([])}
                    >
                        <Typography variant="body2" sx={{fontWeight: 600}}>
                            {seedFailures.length === 1
                                ? '1 stock could not be added:'
                                : `${seedFailures.length} stocks could not be added:`}
                        </Typography>
                        {seedFailures.map((failure: any) => (
                            <Typography key={failure.stockId} variant="body2">
                                {failure.stockId} — {failure.message}
                            </Typography>
                        ))}
                    </Alert>
                )}
            </Container>
            <StocksDetail
                stockId={addedStockIds[0] ?? searchStockId}
                isBreakdownVisible={isBreakdownVisible}
                toggleBreakdownVisible={toggleBreakdownVisible}
                currentBreakdown={currentBreakdown}
            />
        </Box>
    );
}
