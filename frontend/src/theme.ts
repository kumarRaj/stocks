import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'light',
        background: {default: '#f3f5f9', paper: '#ffffff'},
        primary: {main: '#4f46e5'},
        secondary: {main: '#0891b2'},
        success: {main: '#16a34a'},
        warning: {main: '#d97706'},
        error: {main: '#dc2626'},
        text: {primary: '#0f172a', secondary: '#64748b'},
        divider: '#e2e8f0',
    },
    shape: {borderRadius: 10},
    typography: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        button: {textTransform: 'none', fontWeight: 600},
    },
    components: {
        MuiPaper: {styleOverrides: {root: {backgroundImage: 'none'}}},
        MuiButton: {
            styleOverrides: {
                root: {borderRadius: 8, boxShadow: 'none'},
                contained: {'&:hover': {boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'}},
            },
        },
        MuiMenuItem: {styleOverrides: {root: {borderRadius: 6}}},
        MuiOutlinedInput: {styleOverrides: {root: {backgroundColor: '#ffffff'}}},
        MuiTooltip: {defaultProps: {arrow: true}},
    },
});
