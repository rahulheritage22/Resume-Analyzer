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
    Divider,
} from '@mui/material';
import {
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    Lightbulb as LightbulbIcon,
    Assignment as AssignmentIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { AnalysisResponse } from '../types/analysis';

interface AnalysisResultsProps {
    analysis: AnalysisResponse;
}

interface SectionHeaderProps {
    icon: React.ReactNode;
    title: string;
    color: 'success' | 'error' | 'warning' | 'primary';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, color }) => {
    const theme = useTheme();
    
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ 
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : `${color}.lighter`,
                color: `${color}.main`
            }}>
                {icon}
            </Box>
            <Typography variant="h6" sx={{ color: `${color}.main`, fontWeight: 600 }}>
                {title}
            </Typography>
        </Box>
    );
};

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
    const theme = useTheme();

    const renderScoreGauge = (score: number) => {
        const color = score >= 80 ? theme.palette.success.main : 
                     score >= 60 ? theme.palette.warning.main : 
                     theme.palette.error.main;

        const getScoreLabel = (score: number) => {
            if (score >= 80) return 'Excellent Match';
            if (score >= 60) return 'Good Match';
            return 'Needs Improvement';
        };

        return (
            <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={100}
                        size={160}
                        thickness={4}
                        sx={{ color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' }}
                    />
                    <CircularProgress
                        variant="determinate"
                        value={score}
                        size={160}
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
                        <Typography variant="h3" sx={{ fontWeight: 600, color }}>
                            {score}%
                        </Typography>
                    </Box>
                </Box>
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        mt: 2,
                        color,
                        fontWeight: 500
                    }}
                >
                    {getScoreLabel(score)}
                </Typography>
            </Box>
        );
    };

    const renderSection = (title: string, items: string[], color: 'success' | 'error' | 'warning' | 'primary', icon: React.ReactNode) => (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : `${color}.lighter`,
                borderRadius: 3,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                    ? 'divider'
                    : `${color}.main`,
                borderStyle: 'dashed'
            }}
        >
            <SectionHeader icon={icon} title={title} color={color} />
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} useFlexGap>
                {items.map((item, index) => (
                    <Chip
                        key={index}
                        label={item}
                        color={color}
                        variant="outlined"
                        sx={{
                            borderWidth: 2,
                            borderRadius: 2,
                            '& .MuiChip-label': {
                                fontWeight: 500
                            }
                        }}
                    />
                ))}
            </Stack>
        </Paper>
    );

    return (
        <Fade in={true}>
            <Card sx={{ 
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'background.paper',
                border: '1px solid',
                borderColor: 'divider'
            }}>
                <CardContent>
                    <Stack spacing={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'center' }}>
                                <Box sx={{ 
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'primary.lighter',
                                }}>
                                    <TrendingUpIcon color="primary" />
                                </Box>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                                    Resume Match Analysis
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                                {renderScoreGauge(analysis.MatchScore)}
                            </Box>
                        </Box>

                        {renderSection('Key Strengths', analysis.KeyStrengths, 'success', <CheckCircleIcon />)}
                        {renderSection('Skills Gap', analysis.SkillsGap, 'error', <WarningIcon />)}
                        
                        <Box>
                            <SectionHeader 
                                icon={<LightbulbIcon />} 
                                title="Improvement Suggestions" 
                                color="warning" 
                            />
                            <Paper
                                elevation={0}
                                sx={{
                                    bgcolor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.03)' 
                                        : 'warning.lighter',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: theme.palette.mode === 'dark'
                                        ? 'divider'
                                        : 'warning.main',
                                    borderStyle: 'dashed'
                                }}
                            >
                                <List>
                                    {analysis.SuggestionsForImprovement.map((suggestion, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem sx={{ py: 2 }}>
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
                                            {index < analysis.SuggestionsForImprovement.length - 1 && (
                                                <Divider sx={{ opacity: 0.5 }} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Box>

                        <Box>
                            <SectionHeader 
                                icon={<AssignmentIcon />} 
                                title="Overall Assessment" 
                                color="primary" 
                            />
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    bgcolor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.03)' 
                                        : 'primary.lighter',
                                    borderRadius: 3,
                                    border: '1px solid',
                                    borderColor: theme.palette.mode === 'dark'
                                        ? 'divider'
                                        : 'primary.main',
                                    borderStyle: 'dashed',
                                    position: 'relative',
                                    overflow: 'hidden'
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