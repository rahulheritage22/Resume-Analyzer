import * as React from 'react';
import { Viewer, Worker, SpecialZoomLevel, RenderError } from '@react-pdf-viewer/core';
import type { LoadError } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Box, useTheme, CircularProgress, Typography, Alert } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ fileUrl }: { fileUrl: string }) => {
    const theme = useTheme();
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => defaultTabs.slice(0, 2),
    });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');

    const renderError = React.useCallback((error: LoadError) => {
        setError('Failed to load PDF. Please try again.');
        setLoading(false);
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    p: 3,
                }}
            >
                <Alert
                    severity="error"
                    icon={<ErrorOutlineIcon fontSize="large" />}
                    sx={{
                        maxWidth: 400,
                        width: '100%',
                    }}
                >
                    Failed to load PDF. Please try again.
                </Alert>
            </Box>
        );
    }, []);

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
            <Box sx={{
                height: '100%',
                position: 'relative',
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
                    transition: 'all 0.2s ease',
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
                    borderRadius: 1,
                    padding: '4px 8px',
                    '&:focus': {
                        borderColor: theme.palette.primary.main,
                        outline: 'none',
                    }
                },
                '& .rpv-core__menu': {
                    bgcolor: theme.palette.background.paper,
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: theme.shadows[4],
                    borderRadius: 1,
                },
                '& .rpv-core__menu-item': {
                    transition: 'all 0.2s ease',
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
                    transition: 'all 0.2s ease',
                },
                '& .rpv-core__minimal-button:hover': {
                    bgcolor: theme.palette.action.hover,
                },
                '& .rpv-default-layout__sidebar': {
                    bgcolor: theme.palette.background.paper,
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
                '& .rpv-default-layout__header': {
                    bgcolor: theme.palette.background.paper,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                },
            }}>
                {loading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                            zIndex: 1,
                        }}
                    >
                        <CircularProgress size={48} />
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            Loading PDF...
                        </Typography>
                    </Box>
                )}

                {error ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            p: 3,
                        }}
                    >
                        <Alert
                            severity="error"
                            icon={<ErrorOutlineIcon fontSize="large" />}
                            sx={{
                                maxWidth: 400,
                                width: '100%',
                            }}
                        >
                            {error}
                        </Alert>
                    </Box>
                ) : (
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[defaultLayoutPluginInstance]}
                        defaultScale={SpecialZoomLevel.PageFit}
                        theme={theme.palette.mode}
                        onDocumentLoad={() => setLoading(false)}
                        renderError={renderError}
                    />
                )}
            </Box>
        </Worker>
    );
};

export default PDFViewer;
