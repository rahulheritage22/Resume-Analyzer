import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface CustomColors {
    primary?: string;
}

interface ColorModeContextType {
    toggleColorMode: () => void;
    mode: 'light' | 'dark';
    customColors: CustomColors;
    updateCustomColors: (colors: CustomColors) => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
    toggleColorMode: () => { },
    mode: 'light',
    customColors: {},
    updateCustomColors: () => { }
});

export const useColorMode = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider');
    }
    return context;
};

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>(() => {
        const savedMode = localStorage.getItem('colorMode');
        return (savedMode === 'dark' || savedMode === 'light') ? savedMode : 'light';
    });

    const [customColors, setCustomColors] = useState<CustomColors>(() => {
        const savedColors = localStorage.getItem('customColors');
        return savedColors ? JSON.parse(savedColors) : {};
    });

    useEffect(() => {
        localStorage.setItem('colorMode', mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('customColors', JSON.stringify(customColors));
    }, [customColors]);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
            customColors,
            updateCustomColors: (colors: CustomColors) => {
                setCustomColors(colors);
            }
        }),
        [mode, customColors],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            {children}
        </ColorModeContext.Provider>
    );
};