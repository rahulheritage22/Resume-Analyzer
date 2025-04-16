import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    Chip,
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    useTheme,
    Fade,
} from '@mui/material';
import { AnalysisResponse } from '../types/analysis';

interface AnalysisResultsProps {
    analysis: AnalysisResponse;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
    const theme = useTheme();

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

    return (
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
                                {analysis.KeyStrengths.map((strength: string, index: number) => (
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
                                {analysis.SkillsGap.map((gap: string, index: number) => (
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
                                    {analysis.SuggestionsForImprovement.map((suggestion: string, index: number) => (
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
    );
};

export default AnalysisResults;