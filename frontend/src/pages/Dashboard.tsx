import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Alert,
    CircularProgress,
    TextareaAutosize,
    Fade,
    Chip,
    Stack,
    Rating,
    useTheme,
    Dialog,
    IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';
import PDFViewer from '../components/PdfViewer';

interface Resume {
    id: string;
    fileName: string;
    parsedText: string;
    uploadedAt: string;
}

interface AnalysisResponse {
    MatchScore: number;
    KeyStrengths: string[];
    SkillsGap: string[];
    SuggestionsForImprovement: string[];
    OverallAssessment: string;
}

const Dashboard = () => {
    const theme = useTheme();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await api.get('/api/v1/resumes/user/me');
            setResumes(response.data);
        } catch (err) {
            setError('Failed to fetch resumes');
        }
    };

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
                setError('Please upload a PDF file');
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
            fetchResumes();
            setSelectedFile(null);
            setError('');
        } catch (err) {
            setError('Failed to upload resume');
        }
        setLoading(false);
    };

    const handleAnalyze = async () => {
        if (!selectedResume || !jobDescription) return;

        setLoading(true);
        try {
            const response = await api.post(
                `/api/v1/resumes/analyze/${selectedResume.id}`,
                { jobDescription }
            );
            setAnalysis(response.data);
            setError('');
        } catch (err) {
            setError('Failed to analyze resume');
        }
        setLoading(false);
    };

    const handleDeleteResume = async (resumeId: string) => {
        setLoading(true);
        try {
            await api.delete(`/api/v1/resumes/${resumeId}`);
            setResumes(resumes.filter((resume) => resume.id !== resumeId));
            if (selectedResume?.id === resumeId) {
                setSelectedResume(null);
                setJobDescription('');
                setAnalysis(null);
            }
            setError('');
        } catch (err) {
            setError('Failed to delete resume');
        }
        setLoading(false);
    };

    const handleViewResume = async (resumeId: string) => {
        try {
            const response = await api.get(`/api/v1/resumes/${resumeId}/pdf`, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowPdfViewer(true);
        } catch (err) {
            setError('Failed to load PDF');
        }
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    };

    const renderScoreGauge = (score: number) => {
        const color = score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#f44336';
        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={120}
                    thickness={4}
                    sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' }}
                />
                <CircularProgress
                    variant="determinate"
                    value={score}
                    size={120}
                    thickness={4}
                    sx={{
                        color: color,
                        position: 'absolute',
                        left: 0,
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4" component="div" color="text.primary">
                        {score}%
                    </Typography>
                </Box>
            </Box>
        );
    };

    const LoadingSkeleton = () => (
        <Box sx={{ width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }}>
            <Box sx={{ height: 60, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }} />
            <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1, mb: 1, width: '80%' }} />
            <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1, width: '60%' }} />
        </Box>
    );

    return (
        <Box sx={{ py: 3, px: 2 }}>
            <Box display="grid" gap={4}>
                {error && (
                    <Fade in={true}>
                        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
                    </Fade>
                )}

                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                    gap={3}
                >
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

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                            Your Resumes
                        </Typography>
                        {loading ? (
                            <LoadingSkeleton />
                        ) : resumes.length === 0 ? (
                            <Box sx={{
                                textAlign: 'center',
                                py: 4,
                                color: 'text.secondary'
                            }}>
                                <DescriptionIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
                                <Typography variant="body1" gutterBottom>
                                    No resumes uploaded yet
                                </Typography>
                                <Typography variant="body2">
                                    Upload your first resume to get started
                                </Typography>
                            </Box>
                        ) : (
                            <List>
                                {resumes.map((resume, index) => (
                                    <Fade in={true} key={resume.id} style={{ transitionDelay: `${index * 100}ms` }}>
                                        <Box>
                                            <ListItemButton
                                                selected={selectedResume?.id === resume.id}
                                                onClick={() => setSelectedResume(resume)}
                                                sx={{
                                                    borderRadius: 2,
                                                    mb: 1,
                                                    transition: 'all 0.2s ease',
                                                    '&.Mui-selected': {
                                                        bgcolor: 'primary.main',
                                                        color: 'primary.contrastText',
                                                        '&:hover': {
                                                            bgcolor: 'primary.dark',
                                                        }
                                                    }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={resume.fileName}
                                                    secondary={new Date(resume.uploadedAt).toLocaleDateString()}
                                                    sx={{
                                                        '& .MuiListItemText-primary': {
                                                            fontWeight: selectedResume?.id === resume.id ? 600 : 400
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewResume(resume.id);
                                                    }}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <Button
                                                    color="error"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteResume(resume.id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </ListItemButton>
                                            {index < resumes.length - 1 && <Divider sx={{ my: 1 }} />}
                                        </Box>
                                    </Fade>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Box>

                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Analyze Resume
                    </Typography>
                    {selectedResume ? (
                        <>
                            <TextareaAutosize
                                minRows={4}
                                maxRows={10}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here..."
                                minLength={100}
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    fontFamily: 'inherit',
                                    fontSize: '1rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'}`,
                                    marginBottom: '16px',
                                    resize: 'vertical',
                                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
                                    color: theme.palette.text.primary,
                                    ...{
                                        '[data-placeholder]': { color: theme.palette.text.secondary },
                                        '::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
                                        '::-webkit-input-placeholder': { color: theme.palette.text.secondary, opacity: 1 },
                                        ':-ms-input-placeholder': { color: theme.palette.text.secondary, opacity: 1 },
                                        '::-ms-input-placeholder': { color: theme.palette.text.secondary, opacity: 1 }
                                    } as any
                                }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAnalyze}
                                disabled={loading || !jobDescription}
                                startIcon={<WorkIcon />}
                                sx={{ mb: 3 }}
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24} /> : 'Analyze Match'}
                            </Button>
                        </>
                    ) : (
                        <Box sx={{
                            textAlign: 'center',
                            py: 4,
                            color: 'text.secondary'
                        }}>
                            <Typography variant="body1">
                                Select a resume to analyze
                            </Typography>
                            <Typography variant="body2">
                                Choose from your uploaded resumes above
                            </Typography>
                        </Box>
                    )}
                </Paper>

                {analysis && (
                    <Fade in={true}>
                        <Card>
                            <CardContent>
                                <Stack spacing={4}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h6" gutterBottom color="primary">
                                            Match Analysis Results
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mb: 2 }}>
                                            {renderScoreGauge(analysis.MatchScore)}
                                        </Box>
                                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                            Resume Match Score
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                                            Key Strengths
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} useFlexGap>
                                            {analysis.KeyStrengths.map((strength, index) => (
                                                <Chip
                                                    key={index}
                                                    label={strength}
                                                    color="success"
                                                    variant="outlined"
                                                    sx={{
                                                        borderWidth: 2,
                                                        '& .MuiChip-label': {
                                                            fontWeight: 500
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                                            Skills Gap
                                        </Typography>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} useFlexGap>
                                            {analysis.SkillsGap.map((gap, index) => (
                                                <Chip
                                                    key={index}
                                                    label={gap}
                                                    color="error"
                                                    variant="outlined"
                                                    sx={{
                                                        borderWidth: 2,
                                                        '& .MuiChip-label': {
                                                            fontWeight: 500
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                                            Improvement Suggestions
                                        </Typography>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                                                borderRadius: 2
                                            }}
                                        >
                                            <List>
                                                {analysis.SuggestionsForImprovement.map((suggestion, index) => (
                                                    <ListItem
                                                        key={index}
                                                        sx={{
                                                            borderBottom: index < analysis.SuggestionsForImprovement.length - 1
                                                                ? `1px solid ${theme.palette.divider}`
                                                                : 'none'
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={suggestion}
                                                            sx={{
                                                                '& .MuiListItemText-primary': {
                                                                    fontSize: '0.95rem',
                                                                    color: 'text.secondary',
                                                                    lineHeight: 1.6
                                                                }
                                                            }}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Paper>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
                                            Overall Assessment
                                        </Typography>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                                                borderRadius: 2,
                                                borderLeft: `4px solid ${theme.palette.primary.main}`
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    lineHeight: 1.7,
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {analysis.OverallAssessment}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Fade>
                )}
            </Box>

            <Dialog
                open={showPdfViewer}
                onClose={handleClosePdfViewer}
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
                    <IconButton onClick={handleClosePdfViewer}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {pdfUrl && <PDFViewer fileUrl={pdfUrl} />}
            </Dialog>
        </Box>
    );
};

export default Dashboard;