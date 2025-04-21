import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Extend the theme to include custom color properties
declare module '@mui/material/styles' {
    interface Palette {
        lighter?: string;
    }
    interface PaletteOptions {
        lighter?: string;
    }
    interface SimplePaletteColorOptions {
        lighter?: string;
    }
}

interface CustomColors {
    primary?: string;
    secondary?: string;
}

const getDesignTokens = (mode: PaletteMode, customColors: CustomColors = {}): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: customColors.primary || '#2563eb',
            light: mode === 'dark' ? '#3b82f6' : '#60a5fa',
            dark: mode === 'dark' ? '#1d4ed8' : '#1e40af',
            lighter: mode === 'dark' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(37, 99, 235, 0.08)',
            contrastText: '#ffffff',
        },
        error: {
            main: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
            lighter: mode === 'dark' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(220, 38, 38, 0.08)',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        background: mode === 'dark'
            ? {
                default: '#030712',
                paper: '#111827',
            }
            : {
                default: '#f8fafc',
                paper: '#ffffff',
            },
        text: mode === 'dark'
            ? {
                primary: '#f1f5f9',
                secondary: '#94a3b8',
            }
            : {
                primary: '#0f172a',
                secondary: '#475569',
            },
        divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
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
            fontWeight: 700,
            letterSpacing: '-0.025em',
        },
        h2: {
            fontWeight: 700,
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
        body1: {
            fontSize: '1rem',
            lineHeight: 1.7,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 500,
                    padding: '10px 20px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderWidth: '1.5px',
                    '&:hover': {
                        borderWidth: '1.5px',
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: mode === 'dark'
                        ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)'
                        : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    '&.Mui-selected': {
                        backgroundColor: mode === 'dark' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
                outlined: {
                    borderWidth: '2px',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                ':root': {
                    '--primary-color': customColors.primary || (mode === 'light' ? '#2563eb' : '#60a5fa'),
                    '--primary-color-dark': customColors.primary ? adjustColor(customColors.primary, -20) : (mode === 'light' ? '#1d4ed8' : '#3b82f6'),
                    '--primary-color-light': customColors.primary ? adjustColor(customColors.primary, 20) : (mode === 'light' ? '#60a5fa' : '#93c5fd'),
                    '--selection-bg': `${customColors.primary || (mode === 'light' ? '#2563eb' : '#60a5fa')}1a`,
                    '--selection-color': customColors.primary || (mode === 'light' ? '#2563eb' : '#60a5fa'),
                },
                '::selection': {
                    backgroundColor: 'var(--selection-bg)',
                    color: 'var(--selection-color)',
                },
                '::-moz-selection': {
                    backgroundColor: 'var(--selection-bg)',
                    color: 'var(--selection-color)',
                }
            },
        },
    },
});

// Helper function to adjust colors
function adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount));
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export const createAppTheme = (mode: PaletteMode, customColors?: CustomColors) => {
    return createTheme(getDesignTokens(mode, customColors));
};