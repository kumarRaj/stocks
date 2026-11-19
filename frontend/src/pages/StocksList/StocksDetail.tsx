import React from 'react';

import {Alert, Box, Button, Divider, Drawer, LinearProgress, Link, Stack, Tooltip, Typography} from '@mui/material';
import {seedThis} from '../../services/StockService';
import {breakdownSum, SCORE_TOTAL, ScoreRing, scoreTone} from './scoreView';

// @ts-ignore
export const StocksDetail = ({isBreakdownVisible, currentBreakdown, stockId, toggleBreakdownVisible}) => {

    const handleSeedButton = () => {
        seedThis(`${stockId}`, true);
    }

    function formattedDate(date: string): string {
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        // @ts-ignore
        return date && new Date(Date.parse(date)).toLocaleDateString('en-US', options);
    }

    const score = breakdownSum(currentBreakdown);
    const missingFields: string[] = currentBreakdown?.missingFields ?? [];
    const insufficient = missingFields.length > 0;

    const metrics = currentBreakdown ? [
        {
            key: 'PE',
            label: 'PE Ratio',
            max: 5,
            value: currentBreakdown.pe,
            info: 'PE 1–20 earns the full 5 points; the score steps down in tiers as the ratio climbs.',
        },
        {
            key: 'OPM',
            label: 'Operating Profit Margin',
            max: 6,
            value: currentBreakdown.operatingProfitMargin,
            info: 'Profitability from core operations before interest and taxes. One point per improving year in the last 6.',
        },
        {
            key: 'NPM',
            label: 'Net Profit Margin',
            max: 6,
            value: currentBreakdown.netProfitMargin,
            info: 'Profit left after all expenses. One point per improving year in the last 6.',
        },
        {
            key: 'Borrowings',
            label: 'Borrowings',
            max: 6,
            value: currentBreakdown.borrowings,
            info: 'Loan and debt burden. One point per falling year in the last 6 — less debt scores higher.',
        },
        {
            key: 'OtherLiabilities',
            label: 'Other Liabilities',
            max: 6,
            value: currentBreakdown.liabilities,
            info: 'Long-dated liabilities besides borrowings. One point per falling year in the last 6.',
        },
        {
            key: 'Reserves',
            label: 'Reserves',
            max: 6,
            value: currentBreakdown.reserves,
            info: 'Retained earnings kept out of dividends. One point per improving year in the last 6.',
        },
    ] : [];

    return (
        <Drawer
            anchor="right"
            open={isBreakdownVisible}
            onClose={() => toggleBreakdownVisible(false)}
            slotProps={{paper: {sx: {width: 400, maxWidth: '100vw', display: 'flex', flexDirection: 'column'}}}}
        >
            <Box sx={{bgcolor: '#0f172a', color: '#fff', p: 2.5}}>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <ScoreRing score={score} size={58} insufficient={insufficient}/>
                    <Box sx={{minWidth: 0, flexGrow: 1}}>
                        <Typography noWrap sx={{fontWeight: 800, fontSize: 18}}>{stockId}</Typography>
                        <Link
                            href={`https://www.screener.in/company/${stockId}/consolidated/`}
                            target="_blank"
                            sx={{color: '#7dd3fc', fontSize: 13}}
                        >
                            View on screener.in ↗
                        </Link>
                    </Box>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleBreakdownVisible(false)}
                        sx={{color: '#fff', borderColor: 'rgba(255,255,255,0.35)', flexShrink: 0}}
                    >
                        Close
                    </Button>
                </Stack>
            </Box>
            <Divider/>
            <Box sx={{flexGrow: 1, overflowY: 'auto', p: 2.5}}>
                {insufficient && (
                    <Alert severity="warning" sx={{mb: 2}}>
                        <Typography variant="body2" sx={{fontWeight: 600}}>
                            Insufficient data — no score calculated.
                        </Typography>
                        <Typography variant="body2">
                            Missing: {missingFields.join(', ')}. Try refreshing.
                        </Typography>
                    </Alert>
                )}
                {currentBreakdown
                    ? metrics.map(metric => {
                        const isMissing = missingFields.includes(metric.key);
                        const ratio = metric.max > 0 && !isMissing
                            ? Math.max(0, Math.min(100, (metric.value / metric.max) * 100))
                            : 0;
                        return (
                            <Box key={metric.label} sx={{mb: 2}}>
                                <Stack direction="row" spacing={0.5} sx={{alignItems: 'center'}}>
                                    <Typography variant="body2" sx={{fontWeight: 600}}>{metric.label}</Typography>
                                    <Tooltip title={metric.info}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            border: '1px solid #cbd5e1',
                                            color: '#64748b',
                                            fontSize: 10,
                                            cursor: 'help',
                                            flexShrink: 0,
                                        }}>i</span>
                                    </Tooltip>
                                    <Box sx={{flexGrow: 1}}/>
                                    <Typography variant="body2" sx={{fontWeight: 700}}>
                                        {isMissing ? 'N/A' : metric.value}
                                        {!isMissing && (
                                            <Typography component="span" color="text.secondary" sx={{fontSize: 11, ml: 0.5}}>
                                                / {metric.max} pts
                                            </Typography>
                                        )}
                                    </Typography>
                                </Stack>
                                <LinearProgress
                                    variant="determinate"
                                    value={isMissing ? 0 : ratio}
                                    sx={{
                                        mt: 0.5,
                                        height: 6,
                                        borderRadius: 3,
                                        bgcolor: '#eef1f6',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: isMissing ? 'transparent' : scoreTone(metric.value, metric.max),
                                        },
                                    }}
                                />
                            </Box>
                        );
                    })
                    : (
                        <Typography color="error" sx={{fontWeight: 600}}>
                            Data not available — try refreshing.
                        </Typography>
                    )}
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <Typography variant="caption" color="text.secondary" sx={{display: 'block', mb: 1}}>
                    Updated: {formattedDate(currentBreakdown?.lastUpdatedAt)}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        disableElevation
                        onClick={() => handleSeedButton()}
                    >
                        Refresh data
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}
