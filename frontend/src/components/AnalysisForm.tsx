import React from 'react';
import {
    Paper,
    Typography,
    Button,
    Box,
    TextareaAutosize,
    CircularProgress,
    useTheme,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

interface AnalysisFormProps {
    jobDescription: string;
    onJobDescriptionChange: (value: string) => void;
    onAnalyze: () => void;
    onSave: () => void;
    loading: boolean;
    showSaveButton: boolean;
    selectedResume: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
    jobDescription,
    onJobDescriptionChange,
    onAnalyze,
    onSave,
    loading,
    showSaveButton,
    selectedResume,
}) => {
    const theme = useTheme();

    return (
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
                        onChange={(e) => onJobDescriptionChange(e.target.value)}
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
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={onAnalyze}
                        disabled={loading || !jobDescription}
                        startIcon={<WorkIcon />}
                        sx={{ mb: 3 }}
                        fullWidth
                    >
                        {loading ? <CircularProgress size={24} /> : 'Analyze Match'}
                    </Button>
                    {showSaveButton && (
                        <Button
                            variant="outlined"
                            onClick={onSave}
                            disabled={loading}
                            fullWidth
                        >
                            {loading ? <CircularProgress size={24} /> : 'Save Analysis'}
                        </Button>
                    )}
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
    );
};

export default AnalysisForm;