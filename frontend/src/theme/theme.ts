import { PaletteMode, ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

interface CustomColors {
    primary?: string;
}

const getDesignTokens = (mode: PaletteMode, customColors: CustomColors = {}): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: customColors.primary || '#2563eb',
                    light: customColors.primary ? adjustColor(customColors.primary, 20) : '#60a5fa',
                    dark: customColors.primary ? adjustColor(customColors.primary, -20) : '#1d4ed8',
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
                    main: customColors.primary ? adjustColor(customColors.primary, 20) : '#60a5fa',
                    light: customColors.primary ? adjustColor(customColors.primary, 40) : '#93c5fd',
                    dark: customColors.primary || '#3b82f6',
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
                    boxShadow: 'none',
                },
                contained: {
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
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
                    borderRadius: 16,
                    border: '1px solid',
                    borderColor: 'divider',
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