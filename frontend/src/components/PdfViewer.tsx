import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Box, useTheme } from '@mui/material';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
    const theme = useTheme();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <Box sx={{
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.background.paper,
                '& .rpv-core__viewer': {
                    border: 'none',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
                '& .rpv-core__inner-page': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                },
                '& .rpv-core__menubar': {
                    bgcolor: theme.palette.background.paper,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    minHeight: '40px',
                },
                '& .rpv-core__toolbar': {
                    bgcolor: theme.palette.background.paper,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    minHeight: '40px',
                },
                '& .rpv-core__button': {
                    color: theme.palette.text.primary,
                },
                '& .rpv-core__button:hover': {
                    bgcolor: theme.palette.action.hover,
                },
                '& .rpv-core__button--selected': {
                    bgcolor: `${theme.palette.primary.main}14`,
                },
                '& .rpv-core__input': {
                    color: theme.palette.text.primary,
                    bgcolor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:focus': {
                        borderColor: theme.palette.primary.main,
                    }
                },
                '& .rpv-core__menu': {
                    bgcolor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: theme.shadows[4],
                },
                '& .rpv-core__menu-item:hover': {
                    bgcolor: theme.palette.action.hover,
                },
                '& .rpv-core__menu-divider': {
                    borderTop: '1px solid',
                    borderColor: 'divider',
                },
                '& .rpv-core__minimal-button': {
                    color: theme.palette.text.primary,
                },
                '& .rpv-core__minimal-button:hover': {
                    bgcolor: theme.palette.action.hover,
                },
            }}>
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    theme={{
                        theme: theme.palette.mode,
                    }}
                />
            </Box>
        </Worker>
    );
};

export default PDFViewer;
