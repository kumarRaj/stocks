import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAllSectors, getStocksBySector} from '../../services/SectorService';
import {getAllStockScores} from '../../services/ScoreService';
import {seed} from '../../services/StockService';

import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Typography,
} from '@mui/material';
import {ScoreRing, SCORE_TOTAL} from './scoreView';
import {StocksDetail} from './StocksDetail';

type SeedStatus = 'info' | 'success' | 'warning' | 'error';

export const StocksList: React.FC = () => {
    const navigate = useNavigate();
    let [sectors, setSectors] = useState<string[]>([]);
    let [searchStockId, setSearchStockId] = useState('');
    let [stockScores, setStockScores] = useState<any[]>([]);
    let [currentStocks, setCurrentStocks] = useState<any[]>([]);
    let [sectorStocks, setSectorStocks] = useState<any[]>([]);
    let [currentBreakdown, setCurrentBreakdown] = useState<any>({});
    let [selectedStock, setSelectedStock] = useState('');
    let [isBreakdownVisible, toggleBreakdownVisible] = useState(false);
    let [currentSector, setCurrentSector] = useState('');
    let [isSeeding, setIsSeeding] = useState(false);
    let [seedMessage, setSeedMessage] = useState('');
    let [seedStatus, setSeedStatus] = useState<SeedStatus>('info');
    let [sortBy, setSortBy] = useState<'score' | 'name'>('score');
    let [isLoading, setIsLoading] = useState(true);

    const getSearchedStocks = (query: string, stocks: any[]) => {
        const stockIds = Array.from(new Set(query
            .split(/[\s,]+/)
            .map(stockId => stockId.trim().toUpperCase())
            .filter(Boolean)));
        if (stockIds.length === 0) return null;

        const stockIdsToFind = new Set(stockIds);
        return stocks.filter((stock: any) => stockIdsToFind.has(String(stock.stockId).toUpperCase()));
    };

    // on component mount
    useEffect(() => {
        Promise.all([getAllSectors(), getAllStockScores()])
            .then(response => {
                let [sectors, stockScores] = response;
                const sectorsData = sectors.data;
                const withAll = [...sectorsData, 'ALL'];
                setSectors(withAll);
                setStockScores(stockScores.data);
                setCurrentSector(sectorsData.includes('NIFTY 50') ? 'NIFTY 50' : withAll[0]);
            })
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!currentSector) return;
        if (currentSector === 'ALL') {
            const stocks = [...stockScores];
            setSectorStocks(stocks);
            setCurrentStocks(getSearchedStocks(searchStockId, stockScores) || stocks);
            return;
        }
        getStocksBySector(currentSector)
            .then(response => {
                const companies = response.data?.company || stockScores.map((stock: any) => stock.stockId);
                const stocks = filterStocksBasedOnCurrentSector(stockScores, companies);
                setSectorStocks(stocks);
                setCurrentStocks(getSearchedStocks(searchStockId, stockScores) || stocks);
            })
    }, [currentSector, stockScores]);

    const filterStocksBasedOnCurrentSector = (stockScores: any, stocksBySector: any) => {
        return stockScores.filter((stock: any) => stocksBySector.includes(stock.stockId));
    }

    const handleSectorChange = (event: any) => {
        setSearchStockId('');
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
        setSeedStatus('info');
        setSeedMessage('Fetching categories and stock details…');
        try {
            const response = await seed(currentSector);
            const [sectorsResponse, scoresResponse, stocksResponse] = await Promise.all([
                getAllSectors(),
                getAllStockScores(),
                getStocksBySector(currentSector),
            ]);
            const sectorsData = sectorsResponse.data || [];
            setSectors([...sectorsData, 'ALL']);
            const scores = scoresResponse.data || [];
            setStockScores(scores);
            const stocks = currentSector === 'ALL'
                ? scores
                : filterStocksBasedOnCurrentSector(
                    scores,
                    stocksResponse.data?.company || [],
                );
            setSectorStocks(stocks);
            setCurrentStocks(getSearchedStocks(searchStockId, scores) || stocks);

            const result = response.data;
            if (result.stocks?.aborted) {
                setSeedStatus('warning');
                setSeedMessage(`Seed stopped after rate limits: ${result.stocks.abortReason}. ${result.stocks.updated} updated, ${result.stocks.unattempted} not attempted. Try again later.`);
                return;
            }
            const failures = result.categories.failed + result.stocks.failed;
            if (result.success) {
                setSeedStatus('success');
                setSeedMessage(`Seed complete: ${result.categories.available} categories and ${result.stocks.updated} stocks updated.`);
            } else {
                setSeedStatus('warning');
                setSeedMessage(`Seed finished with ${failures} errors. ${result.stocks.updated} stocks updated.`);
            }
        } catch (error) {
            setSeedStatus('error');
            const responseError = (error as any)?.response?.data?.error;
            const message = typeof responseError === 'string'
                ? responseError
                : responseError?.message || (error as any)?.message || 'Seed failed.';
            setSeedMessage(`Seed failed: ${message}`);
        } finally {
            setIsSeeding(false);
        }
    }

    function handleSearch(event: any) {
        const textToSearch = event.target.value;
        setSearchStockId(textToSearch);
        const result = getSearchedStocks(textToSearch, stockScores);
        if (!result) {
            setCurrentStocks(sectorStocks);
            return;
        }
        setCurrentStocks(result);
    }

    const searchedStockIds = Array.from(new Set(searchStockId
        .split(/[\s,]+/)
        .map(stockId => stockId.trim().toUpperCase())
        .filter(Boolean)));
    const availableStockIds = new Set(stockScores.map((stock: any) => String(stock.stockId).toUpperCase()));
    const missingStockIds = searchedStockIds.filter(stockId => !availableStockIds.has(stockId));

    const orderedStocks = useMemo(() => {
        const copy = [...currentStocks];
        if (sortBy === 'name') {
            copy.sort((a: any, b: any) => String(a.stockId).localeCompare(String(b.stockId)));
        } else {
            copy.sort((a: any, b: any) => b.score - a.score);
        }
        return copy;
    }, [currentStocks, sortBy]);

    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column'}}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider'}}
            >
                <Container maxWidth="xl">
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
                        <Stack sx={{mr: 'auto'}}>
                            <Typography sx={{fontWeight: 800, fontSize: 17, lineHeight: 1.15}}>
                                Stock Scores
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                screener.in · fundamental score
                            </Typography>
                        </Stack>
                    </Toolbar>
                </Container>
                {isSeeding && <LinearProgress sx={{position: 'absolute', bottom: 0, left: 0, right: 0}}/>}
            </AppBar>

            <Container maxWidth="xl" sx={{pt: 2.5, flexGrow: 1}}>
                <Paper sx={{p: 1.5, borderRadius: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.25}}>
                    <Typography variant="overline" sx={{pl: 1, color: 'text.secondary', fontWeight: 700}}>
                        Sector
                    </Typography>
                    <Select
                        size="small"
                        value={currentSector}
                        onChange={handleSectorChange}
                        sx={{width: {xs: '100%', sm: 220}, fontWeight: 600}}
                    >
                        {sectors.map(sector => (
                            <MenuItem key={sector} value={sector}>{sector}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        size="small"
                        placeholder={'Search: TCS, INFY\nRELIANCE'}
                        helperText={missingStockIds.length > 0 ? `No data for: ${missingStockIds.join(', ')}` : undefined}
                        multiline
                        minRows={2}
                        maxRows={4}
                        value={searchStockId}
                        onChange={handleSearch}
                        sx={{width: {xs: '100%', sm: 220}}}
                    />
                    <ToggleButtonGroup
                        size="small"
                        exclusive
                        value={sortBy}
                        onChange={(_, value) => value && setSortBy(value)}
                    >
                        <ToggleButton value="score">Top score</ToggleButton>
                        <ToggleButton value="name">A–Z</ToggleButton>
                    </ToggleButtonGroup>
                    <Box sx={{flexGrow: 1}}/>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleSeedButton}
                        disabled={isSeeding}
                    >
                        {isSeeding ? 'Seeding…' : 'Seed data'}
                    </Button>
                </Paper>

                {seedMessage && (
                    <Alert severity={seedStatus} onClose={() => setSeedMessage('')} sx={{mt: 2}}>
                        {seedMessage}
                    </Alert>
                )}

                <Grid container spacing={1.5} sx={{mt: 0.5}}>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{p: 1.75, px: 2.25, borderRadius: 2}}>
                            <Typography variant="overline" color="text.secondary" sx={{letterSpacing: 1}}>
                                Stocks in view
                            </Typography>
                            {isLoading
                                ? <Skeleton width={110} height={26}/>
                                : <Typography sx={{fontWeight: 800, fontSize: 18, lineHeight: 1.2}}>{orderedStocks.length}</Typography>}
                        </Paper>
                    </Grid>
                </Grid>

                {!isLoading && orderedStocks.length === 0 && (
                    <Box sx={{py: 10, textAlign: 'center'}}>
                        <Typography color="text.secondary">
                            No stocks to show. Try a different sector or search, or seed the data first.
                        </Typography>
                    </Box>
                )}

                <Grid container spacing={2} sx={{mt: 1, mb: 6}} key={currentStocks.length}>
                    {isLoading
                        ? Array.from({length: 8}).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Card variant="outlined" sx={{borderRadius: 2}}>
                                    <CardContent sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                        <Skeleton variant="circular" width={54} height={54}/>
                                        <Box sx={{flexGrow: 1}}>
                                            <Skeleton width="65%"/>
                                            <Skeleton width="40%"/>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        : orderedStocks.map((currentStock: any) => {
                            let {stockId, scoreBreakdown, score} = currentStock;
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={stockId}>
                                    <Card
                                        variant="outlined"
                                        onClick={() => handleBreakdownToggle(scoreBreakdown, stockId)}
                                        sx={{
                                            cursor: 'pointer',
                                            borderRadius: 2,
                                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 10px 24px rgba(15, 23, 42, 0.10)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                            <ScoreRing score={score}/>
                                            <Box sx={{minWidth: 0}}>
                                                <Typography noWrap sx={{fontWeight: 700}}>{stockId}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Score {score} / {SCORE_TOTAL}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Container>

            <Typography variant="caption" color="text.secondary" sx={{textAlign: 'center', pb: 3}}>
                Data sourced from screener.in · Maximum score {SCORE_TOTAL}
            </Typography>

            <StocksDetail
                stockId={selectedStock}
                isBreakdownVisible={isBreakdownVisible}
                toggleBreakdownVisible={toggleBreakdownVisible}
                currentBreakdown={currentBreakdown}
            />
        </Box>
    );
}
