import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Stack, useTheme } from '@mui/material';
import api from '../services/api';
import { Resume } from '../types/resume';
import { AnalysisResponse, SavedAnalysis } from '../types/analysis';
import ResumeUpload from '../components/ResumeUpload';
import ResumeList from '../components/ResumeList';
import SavedAnalysesList from '../components/SavedAnalysesList';
import AnalysisForm from '../components/AnalysisForm';
import AnalysisResults from '../components/AnalysisResults';
import PDFViewerDialog from '../components/PDFViewerDialog';
import { AxiosError } from 'axios';

const Dashboard = () => {
    const theme = useTheme();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [analysisError, setAnalysisError] = useState('');
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([]);
    const [selectedAnalysis, setSelectedAnalysis] = useState<SavedAnalysis | null>(null);
    const [analysisModified, setAnalysisModified] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await api.get('/api/v1/resumes/user/me');
            setResumes(response.data);
        } catch (err) {
            setUploadError('Failed to fetch resumes');
        }
    };

    const fetchAnalyses = async (resumeId: string) => {
        try {
            const response = await api.get(`/api/v1/analysis/resume/${resumeId}`);
            setSavedAnalyses(response.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                setAnalysisError(err.response?.data.message);
            } else {
                setAnalysisError('Failed to fetch analyses');
            }
        }
    };

    const handleAnalyze = async () => {
        if (!selectedResume || !jobDescription) return;

        setLoading(true);
        setAnalysisError('');
        try {
            const response = await api.post(
                `/api/v1/resumes/analyze/${selectedResume.id}`,
                { jobDescription }
            );
            setAnalysis(response.data);
            setAnalysisModified(true);
        } catch (err) {
            if (err instanceof AxiosError) {
                setAnalysisError(err.response?.data.message || 'Failed to analyze resume');
            } else {
                setAnalysisError('Failed to analyze resume');
            }
        }
        setLoading(false);
    };

    const handleSaveAnalysis = async () => {
        if (!selectedResume || !analysis || !jobDescription) return;

        setLoading(true);
        try {
            if (selectedAnalysis) {
                await api.put(`/api/v1/analysis/${selectedAnalysis.id}`, {
                    jobDescription,
                    aiSummary: analysis
                });
            } else {
                const response = await api.post('/api/v1/analysis', {
                    resumeId: selectedResume.id,
                    jobDescription,
                    aiSummary: analysis
                });
                setSelectedAnalysis(response.data);
            }
            setAnalysisModified(false);
            await fetchAnalyses(selectedResume.id);
            setAnalysisError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setAnalysisError(err.response?.data.message);
            } else {
                setAnalysisError('Failed to save analysis');
            }
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
            setUploadError('');
        } catch (err) {
            setUploadError('Failed to delete resume');
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
            setUploadError('Failed to load PDF');
        }
    };

    const handleClosePdfViewer = () => {
        setShowPdfViewer(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    };

    const handleSelectResume = async (resume: Resume | null) => {
        setSelectedResume(resume);
        // Clear all analysis-related state when switching resumes
        setJobDescription('');
        setAnalysis(null);
        setSelectedAnalysis(null);
        setSavedAnalyses([]);
        setAnalysisModified(false);
        
        if (resume) {
            try {
                await fetchAnalyses(resume.id);
            } catch (err) {
                setAnalysisError('Failed to fetch analyses');
            }
        }
    };

    const handleViewSavedAnalysis = (analysis: SavedAnalysis | null) => {
        setSelectedAnalysis(analysis);
        if (analysis) {
            setJobDescription(analysis.jobDescription);
            setAnalysis(analysis.aiSummary);
        } else {
            setJobDescription('');
            setAnalysis(null);
        }
        setAnalysisModified(false);
    };

    const handleDeleteAnalysis = async (analysisId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setLoading(true);
        try {
            await api.delete(`/api/v1/analysis/${analysisId}`);
            setSavedAnalyses(savedAnalyses.filter((analysis) => analysis.id !== analysisId));
            if (selectedAnalysis?.id === analysisId) {
                setSelectedAnalysis(null);
                setAnalysis(null);
                setJobDescription('');
            }
            setAnalysisError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setAnalysisError(err.response?.data.message);
            } else {
                setAnalysisError('Failed to delete analysis');
            }
        }
        setLoading(false);
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f8fafc',
            pb: 4 
        }}>
            <Container maxWidth="xl" sx={{ pt: 4 }}>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 4, 
                        fontWeight: 600, 
                        color: 'text.primary',
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    Resume Analysis Dashboard
                </Typography>
                
                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', md: '350px 1fr' }}
                    gap={3}
                    sx={{
                        mx: 'auto',
                        alignItems: 'start'
                    }}
                >
                    <Box>
                        <Stack spacing={3}>
                            <ResumeUpload
                                onUploadSuccess={fetchResumes}
                                onError={setUploadError}
                                error={uploadError}
                            />
                            <ResumeList
                                resumes={resumes}
                                selectedResume={selectedResume}
                                onSelectResume={handleSelectResume}
                                onDeleteResume={handleDeleteResume}
                                onViewResume={handleViewResume}
                                loading={loading}
                            />
                        </Stack>
                    </Box>

                    <Box>
                        <Stack spacing={3}>
                            {selectedResume && (
                                <SavedAnalysesList
                                    analyses={savedAnalyses}
                                    selectedAnalysis={selectedAnalysis}
                                    onViewAnalysis={handleViewSavedAnalysis}
                                    onDeleteAnalysis={handleDeleteAnalysis}
                                />
                            )}

                            <AnalysisForm
                                jobDescription={jobDescription}
                                onJobDescriptionChange={setJobDescription}
                                onAnalyze={handleAnalyze}
                                onSave={handleSaveAnalysis}
                                loading={loading}
                                showSaveButton={analysisModified}
                                selectedResume={!!selectedResume}
                                error={analysisError}
                            />

                            {analysis && (
                                <AnalysisResults analysis={analysis} />
                            )}
                        </Stack>
                    </Box>
                </Box>
            </Container>

            <PDFViewerDialog
                open={showPdfViewer}
                onClose={handleClosePdfViewer}
                pdfUrl={pdfUrl}
            />
        </Box>
    );
};

export default Dashboard;