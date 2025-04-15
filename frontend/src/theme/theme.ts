import { PaletteMode, ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#2563eb',
                    light: '#60a5fa',
                    dark: '#1d4ed8',
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#4f46e5',
                    light: '#818cf8',
                    dark: '#4338ca',
                    contrastText: '#ffffff',
                },
                error: {
                    main: '#dc2626',
                    light: '#ef4444',
                    dark: '#b91c1c',
                },
                success: {
                    main: '#16a34a',
                    light: '#22c55e',
                    dark: '#15803d',
                },
                background: {
                    default: '#f8fafc',
                    paper: '#ffffff',
                },
                text: {
                    primary: '#0f172a',
                    secondary: '#475569',
                },
                divider: 'rgba(0, 0, 0, 0.06)',
            }
            : {
                primary: {
                    main: '#60a5fa',
                    light: '#93c5fd',
                    dark: '#3b82f6',
                    contrastText: '#000000',
                },
                secondary: {
                    main: '#818cf8',
                    light: '#a5b4fc',
                    dark: '#6366f1',
                    contrastText: '#000000',
                },
                error: {
                    main: '#ef4444',
                    light: '#f87171',
                    dark: '#dc2626',
                },
                success: {
                    main: '#22c55e',
                    light: '#4ade80',
                    dark: '#16a34a',
                },
                background: {
                    default: '#0f172a',
                    paper: '#1e293b',
                },
                text: {
                    primary: '#f8fafc',
                    secondary: '#cbd5e1',
                },
                divider: 'rgba(255, 255, 255, 0.08)',
            }),
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h4: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        h6: {
            fontWeight: 600,
            letterSpacing: '-0.025em',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '8px 16px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                rounded: {
                    borderRadius: 12,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid',
                    borderColor: 'divider',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                },
            },
        },
    },
});

export const createAppTheme = (mode: PaletteMode) => {
    return createTheme(getDesignTokens(mode));
};