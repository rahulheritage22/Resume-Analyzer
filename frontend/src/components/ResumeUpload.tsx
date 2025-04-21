import React, { useState, useCallback } from 'react';
import {
    Paper,
    Typography,
    Button,
    Box,
    Alert,
    Fade,
    Chip,
    CircularProgress,
    useTheme,
    Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import api from '../services/api';

interface ResumeUploadProps {
    onUploadSuccess: () => void;
    onError: (error: string) => void;
    error?: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
    onUploadSuccess,
    onError,
    error
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            onError('');
        } else {
            onError('Please upload a PDF file');
        }
    }, [onError]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            onError('');
        } else {
            onError('Please upload a PDF file');
        }
    }, [onError]);

    const handleUpload = useCallback(async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await api.post('/api/v1/resumes/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUploadSuccess();
            setSelectedFile(null);
            onError('');
        } catch (err: any) {
            onError(err.response?.data?.message || 'Failed to upload resume');
        }
        setLoading(false);
    }, [selectedFile, onUploadSuccess, onError]);

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3,
                minHeight: 280,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'background.paper',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%', 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'primary.lighter',
                }}>
                    <UploadFileIcon color="primary" />
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, flex: 1 }}>
                    Upload Resume
                </Typography>
            </Box>

            {error && (
                <Fade in={true}>
                    <Alert 
                        severity="error" 
                        onClose={() => onError('')}
                        sx={{ 
                            mb: 3,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'error.light'
                        }}
                    >
                        {error}
                    </Alert>
                </Fade>
            )}

            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    minHeight: selectedFile ? '120px' : '200px',
                    transition: 'all 0.3s ease',
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    border: '2px dashed',
                    borderColor: isDragging 
                        ? 'primary.main' 
                        : error 
                            ? 'error.main' 
                            : theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.1)' 
                                : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    bgcolor: isDragging
                        ? theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)'
                        : theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(0, 0, 0, 0.01)',
                    px: 3,
                    '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                    }
                }}
            >
                <input
                    accept=".pdf"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                
                {!selectedFile ? (
                    <label htmlFor="raised-button-file" style={{ width: '100%', cursor: 'pointer' }}>
                        <Stack spacing={2} alignItems="center">
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.05)' 
                                        : 'primary.lighter',
                                    transition: 'all 0.3s ease',
                                    mb: 1
                                }}
                            >
                                <CloudUploadIcon 
                                    sx={{ 
                                        fontSize: 40,
                                        color: 'primary.main',
                                        transform: isDragging ? 'translateY(-5px)' : 'none',
                                        transition: 'transform 0.3s ease'
                                    }} 
                                />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                or click to browse from your computer
                            </Typography>
                        </Stack>
                    </label>
                ) : (
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Chip
                            icon={<DescriptionIcon />}
                            label={selectedFile.name}
                            onDelete={() => setSelectedFile(null)}
                            sx={{ 
                                mb: 2,
                                py: 2.5,
                                borderRadius: 2,
                                '& .MuiChip-label': {
                                    fontSize: '0.95rem'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleUpload}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 500,
                                boxShadow: theme.shadows[4]
                            }}
                        >
                            {loading ? 'Uploading...' : 'Upload Resume'}
                        </Button>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default ResumeUpload;