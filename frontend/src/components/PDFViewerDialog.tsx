import React from 'react';
import {
    Dialog,
    IconButton,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PDFViewer from './PdfViewer';

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
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '90vh'
                }
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
                position: 'absolute',
                right: 0,
                zIndex: 1
            }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {pdfUrl && <PDFViewer fileUrl={pdfUrl} />}
        </Dialog>
    );
};

export default PDFViewerDialog;