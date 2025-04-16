import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Stack,
    Tooltip,
} from '@mui/material';
import { useColorMode } from '../theme/ColorModeContext';
import CheckIcon from '@mui/icons-material/Check';

interface ThemeSettingsProps {
    open: boolean;
    onClose: () => void;
}

const colorOptions = {
    primary: [
        { name: 'Blue', value: '#2563eb' },
        { name: 'Purple', value: '#7c3aed' },
        { name: 'Pink', value: '#db2777' },
        { name: 'Red', value: '#dc2626' },
        { name: 'Orange', value: '#ea580c' },
        { name: 'Green', value: '#16a34a' },
        { name: 'Teal', value: '#0d9488' },
        { name: 'Indigo', value: '#4f46e5' },
    ],
};

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ open, onClose }) => {
    const { customColors, updateCustomColors } = useColorMode();

    const handleColorChange = (value: string) => {
        updateCustomColors({ primary: value });
    };

    const ColorSwatch = ({ color, selected, onClick }: { color: { name: string, value: string }, selected: boolean, onClick: () => void }) => (
        <Tooltip title={color.name} arrow>
            <Box
                onClick={onClick}
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    backgroundColor: color.value,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: selected ? 'white' : 'transparent',
                    boxShadow: selected ? '0 0 0 2px currentColor' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    }
                }}
            >
                {selected && <CheckIcon sx={{ color: 'white' }} />}
            </Box>
        </Tooltip>
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Customize Theme Colors</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>Primary Color</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {colorOptions.primary.map((color) => (
                                <ColorSwatch
                                    key={color.value}
                                    color={color}
                                    selected={customColors.primary === color.value}
                                    onClick={() => handleColorChange(color.value)}
                                />
                            ))}
                        </Box>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ThemeSettings;