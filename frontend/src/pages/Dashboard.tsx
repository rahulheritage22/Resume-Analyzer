import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    TextField,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import WorkIcon from '@mui/icons-material/Work';
import api from '../services/api';

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
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

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

    return (
        <Box component="main">
            <Box display="grid" gap={3}>
                {error && (
                    <Box>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                {/* Resume Upload and List Section */}
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
                    {/* Resume Upload Section */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Upload Resume
                        </Typography>
                        <input
                            accept=".pdf"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                sx={{ mb: 2 }}
                            >
                                Select PDF File
                            </Button>
                        </label>
                        {selectedFile && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2">{selectedFile.name}</Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleUpload}
                                    disabled={loading}
                                    sx={{ mt: 1 }}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Upload'}
                                </Button>
                            </Box>
                        )}
                    </Paper>

                    {/* Resume List Section */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Your Resumes
                        </Typography>
                        <List>
                            {resumes.map((resume) => (
                                <React.Fragment key={resume.id}>
                                    <ListItemButton
                                        selected={selectedResume?.id === resume.id}
                                        onClick={() => setSelectedResume(resume)}
                                    >
                                        <ListItemText
                                            primary={resume.fileName}
                                            secondary={new Date(resume.uploadedAt).toLocaleString()}
                                        />
                                    </ListItemButton>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Box>

                {/* Job Description and Analysis Section */}
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Analyze Resume
                    </Typography>
                    {selectedResume ? (
                        <>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Enter Job Description"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                onClick={handleAnalyze}
                                disabled={loading || !jobDescription}
                                startIcon={<WorkIcon />}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Analyze'}
                            </Button>
                        </>
                    ) : (
                        <Typography color="textSecondary">
                            Select a resume to analyze
                        </Typography>
                    )}
                </Paper>

                {/* Analysis Results Section */}
                {analysis && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Analysis Results
                            </Typography>
                            <Typography variant="h4" color="primary" gutterBottom>
                                Match Score: {analysis.MatchScore}%
                            </Typography>

                            <Typography variant="subtitle1" gutterBottom>
                                Key Strengths:
                            </Typography>
                            <List>
                                {analysis.KeyStrengths.map((strength, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={strength} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="subtitle1" gutterBottom>
                                Skills Gap:
                            </Typography>
                            <List>
                                {analysis.SkillsGap.map((gap, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={gap} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="subtitle1" gutterBottom>
                                Suggestions for Improvement:
                            </Typography>
                            <List>
                                {analysis.SuggestionsForImprovement.map((suggestion, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={suggestion} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="subtitle1" gutterBottom>
                                Overall Assessment:
                            </Typography>
                            <Typography paragraph>{analysis.OverallAssessment}</Typography>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;