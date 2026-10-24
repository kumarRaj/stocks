import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';

export const SCORE_TOTAL = 30;

export function scoreTone(score: number, total: number = SCORE_TOTAL): string {
    const pct = total > 0 ? score / total : 0;
    if (pct >= 0.8) return '#16a34a';
    if (pct >= 0.55) return '#d97706';
    return '#dc2626';
}

export const breakdownSum = (breakdown: any): number => {
    if (!breakdown) return 0;
    return (breakdown.pe || 0)
        + (breakdown.operatingProfitMargin || 0)
        + (breakdown.netProfitMargin || 0)
        + (breakdown.borrowings || 0)
        + (breakdown.liabilities || 0)
        + (breakdown.reserves || 0);
};

interface ScoreRingProps {
    score: number;
    total?: number;
    size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({score, total = SCORE_TOTAL, size = 54}) => {
    const color = scoreTone(score, total);
    const pct = total > 0 ? Math.max(0, Math.min(100, (score / total) * 100)) : 0;
    return (
        <Box sx={{position: 'relative', display: 'inline-flex', flexShrink: 0}}>
            <CircularProgress variant="determinate" value={pct} size={size} thickness={4.5} sx={{color}}/>
            <Box sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography component="span" sx={{fontWeight: 800, fontSize: Math.round(size / 4), color}}>
                    {score}
                </Typography>
            </Box>
        </Box>
    );
};
