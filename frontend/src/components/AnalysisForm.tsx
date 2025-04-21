import React from 'react';
import {
    Paper,
    Typography,
    Button,
    Box,
    TextareaAutosize,
    CircularProgress,
    useTheme,
    Fade,
    Alert,
    Tooltip,
    Stack,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';

interface AnalysisFormProps {
    jobDescription: string;
    onJobDescriptionChange: (value: string) => void;
    onAnalyze: () => void;
    onSave: () => void;
    loading: boolean;
    showSaveButton: boolean;
    selectedResume: boolean;
    error?: string;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
    jobDescription,
    onJobDescriptionChange,
    onAnalyze,
    onSave,
    loading,
    showSaveButton,
    selectedResume,
    error
}) => {
    const theme = useTheme();

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'background.paper',
            }}
        >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkIcon color="primary" />
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                    Analyze Resume
                </Typography>
                <Tooltip title="Paste a job description to analyze how well your resume matches the requirements" arrow>
                    <InfoIcon sx={{ ml: 1, color: 'action.active', cursor: 'help' }} />
                </Tooltip>
            </Box>

            {error && (
                <Fade in={true}>
                    <Alert 
                        severity="error" 
                        sx={{ 
                            mb: 3,
                            borderRadius: 2
                        }}
                    >
                        {error}
                    </Alert>
                </Fade>
            )}

            {selectedResume ? (
                <Stack spacing={3}>
                    <TextareaAutosize
                        minRows={4}
                        maxRows={10}
                        value={jobDescription}
                        onChange={(e) => onJobDescriptionChange(e.target.value)}
                        placeholder="Paste the job description here..."
                        minLength={100}
                        style={{
                            width: '100%',
                            padding: '16px',
                            fontFamily: 'inherit',
                            fontSize: '1rem',
                            borderRadius: '12px',
                            border: `2px solid ${error ? theme.palette.error.main : theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                            outline: 'none',
                            resize: 'vertical',
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            transition: 'all 0.2s ease',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = theme.palette.primary.main;
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={onAnalyze}
                            disabled={loading || !jobDescription}
                            startIcon={loading ? <CircularProgress size={20} /> : <WorkIcon />}
                            fullWidth
                            sx={{
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 500
                            }}
                        >
                            {loading ? 'Analyzing...' : 'Analyze Match'}
                        </Button>

                        {showSaveButton && (
                            <Button
                                variant="outlined"
                                onClick={onSave}
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                fullWidth
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 500
                                }}
                            >
                                {loading ? 'Saving...' : 'Save Analysis'}
                            </Button>
                        )}
                    </Box>
                </Stack>
            ) : (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)',
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: 'divider',
                }}>
                    <WorkIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                        Select a Resume First
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Choose a resume from the list above to start analyzing
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default AnalysisForm;