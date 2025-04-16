import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Chip,
    CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import api from '../services/api';

interface ResumeUploadProps {
    onUploadSuccess: () => void;
    onError: (error: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess, onError }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === 'application/pdf') {
                setSelectedFile(file);
            } else {
                onError('Please upload a PDF file');
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        try {
            await api.post('/api/v1/resumes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUploadSuccess();
            setSelectedFile(null);
        } catch (err) {
            onError('Failed to upload resume');
        }
        setLoading(false);
    };

    return (
        <Paper
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '200px',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
            }}
        >
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                Upload Resume
            </Typography>
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    width: '100%',
                    transition: 'all 0.3s ease',
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    border: '2px dashed',
                    borderColor: isDragging ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDragging ? 'action.hover' : 'transparent'
                }}
            >
                <input
                    accept=".pdf"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file" style={{ width: '100%', cursor: 'pointer' }}>
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="body1" gutterBottom>
                        {isDragging ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        or click to browse
                    </Typography>
                </label>
            </Box>
            {selectedFile && (
                <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                    <Chip
                        icon={<DescriptionIcon />}
                        label={selectedFile.name}
                        onDelete={() => setSelectedFile(null)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleUpload}
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Upload Resume'}
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default ResumeUpload;