import React from 'react';
import {
    Dialog,
    IconButton,
    Box,
    useTheme,
    Slide,
    AppBar,
    Toolbar,
    Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import PDFViewer from './PdfViewer';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface PDFViewerDialogProps {
    open: boolean;
    onClose: () => void;
    pdfUrl: string | null;
}

const PDFViewerDialog: React.FC<PDFViewerDialogProps> = ({
    open,
    onClose,
    pdfUrl,
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar 
                position="relative" 
                elevation={0}
                sx={{ 
                    bgcolor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DescriptionIcon color="primary" />
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                            Resume Preview
                        </Typography>
                    </Box>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={onClose}
                        sx={{ 
                            ml: 'auto',
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.08)' 
                                    : 'rgba(0, 0, 0, 0.04)',
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <Box sx={{ 
                height: 'calc(100vh - 64px)',
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
            }}>
                {pdfUrl && <PDFViewer fileUrl={pdfUrl} />}
            </Box>
        </Dialog>
    );
};

export default PDFViewerDialog;