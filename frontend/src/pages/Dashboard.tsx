import React, { useState, useEffect } from 'react';
import { Box, Alert, Fade } from '@mui/material';
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
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
            setError('Failed to fetch resumes');
        }
    };

    const fetchAnalyses = async (resumeId: string) => {
        try {
            const response = await api.get(`/api/v1/analysis/resume/${resumeId}`);
            setSavedAnalyses(response.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                setError('Failed to fetch analyses');
            }
        }
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
            setAnalysisModified(true);
            setError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                setError('Failed to analyze resume');
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
            setError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                setError('Failed to save analysis');
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

    const handleSelectResume = (resume: Resume | null) => {
        setSelectedResume(resume);
        if (!resume) {
            setJobDescription('');
            setAnalysis(null);
            setSavedAnalyses([]);
        }
    };

    const handleViewSavedAnalysis = (analysis: SavedAnalysis) => {
        setSelectedAnalysis(analysis);
        setJobDescription(analysis.jobDescription);
        setAnalysis(analysis.aiSummary);
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
            setError('');
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                setError('Failed to delete analysis');
            }
        }
        setLoading(false);
    };

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
                    <ResumeUpload
                        onUploadSuccess={fetchResumes}
                        onError={setError}
                    />
                    <ResumeList
                        resumes={resumes}
                        selectedResume={selectedResume}
                        onSelectResume={handleSelectResume}
                        onDeleteResume={handleDeleteResume}
                        onViewResume={handleViewResume}
                        loading={loading}
                    />
                </Box>

                {selectedResume && (
                    <SavedAnalysesList
                        analyses={savedAnalyses}
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
                />

                {analysis && <AnalysisResults analysis={analysis} />}
            </Box>

            <PDFViewerDialog
                open={showPdfViewer}
                onClose={handleClosePdfViewer}
                pdfUrl={pdfUrl}
            />
        </Box>
    );
};

export default Dashboard;