import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../theme/ColorModeContext';

interface ThemeToggleProps {
    sx?: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ sx }) => {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();

    return (
        <IconButton
            onClick={toggleColorMode}
            sx={{
                color: 'text.primary',
                position: 'fixed',
                top: 16,
                right: 16,
                zIndex: 1100,
                ...sx
            }}
        >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default ThemeToggle;