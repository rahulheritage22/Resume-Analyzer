import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Chip,
    IconButton,
    Box,
    Divider,
    useTheme,
    Fade,
    Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { SavedAnalysis } from '../types/analysis';

interface SavedAnalysesListProps {
    analyses: SavedAnalysis[];
    selectedAnalysis: SavedAnalysis | null;
    onViewAnalysis: (analysis: SavedAnalysis | null) => void;
    onDeleteAnalysis: (id: string, event: React.MouseEvent) => void;
}

const SavedAnalysesList: React.FC<SavedAnalysesListProps> = ({
    analyses,
    selectedAnalysis,
    onViewAnalysis,
    onDeleteAnalysis,
}) => {
    const theme = useTheme();

    if (analyses.length === 0) return null;

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'warning';
        return 'error';
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <TrendingUpIcon fontSize="small" />;
        if (score >= 60) return <TrendingFlatIcon fontSize="small" />;
        return <TrendingDownIcon fontSize="small" />;
    };

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
                    <HistoryIcon color="primary" />
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, flex: 1 }}>
                    Previous Analyses
                </Typography>
                <Chip 
                    label={`${analyses.length} ${analyses.length === 1 ? 'Analysis' : 'Analyses'}`}
                    size="small"
                    sx={{ 
                        fontWeight: 500,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'primary.lighter',
                        color: 'primary.main',
                        borderRadius: 2
                    }}
                />
            </Box>

            <List sx={{ 
                maxHeight: 300, 
                overflow: 'auto',
                mx: -3,
                px: 3,
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                },
            }}>
                {analyses.map((analysis, index) => (
                    <Fade in={true} key={analysis.id} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Box>
                            <ListItemButton
                                onClick={() => onViewAnalysis(selectedAnalysis?.id === analysis.id ? null : analysis)}
                                selected={selectedAnalysis?.id === analysis.id}
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    transition: 'all 0.2s ease',
                                    border: '1px solid',
                                    borderColor: selectedAnalysis?.id === analysis.id 
                                        ? 'primary.main'
                                        : 'transparent',
                                    bgcolor: selectedAnalysis?.id === analysis.id
                                        ? theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : 'primary.lighter'
                                        : 'transparent',
                                    '&:hover': {
                                        bgcolor: theme.palette.mode === 'dark'
                                            ? 'rgba(255, 255, 255, 0.05)'
                                            : 'rgba(0, 0, 0, 0.02)',
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    mr: 2,
                                    bgcolor: theme.palette.mode === 'dark' 
                                        ? 'rgba(255, 255, 255, 0.05)' 
                                        : `${getScoreColor(analysis.aiSummary.MatchScore)}.lighter`,
                                    color: `${getScoreColor(analysis.aiSummary.MatchScore)}.main`
                                }}>
                                    {getScoreIcon(analysis.aiSummary.MatchScore)}
                                </Box>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ 
                                                fontWeight: selectedAnalysis?.id === analysis.id ? 600 : 500,
                                                color: selectedAnalysis?.id === analysis.id ? 'primary.main' : 'text.primary'
                                            }}>
                                                Match Score: {analysis.aiSummary.MatchScore}%
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mt: 0.5,
                                                fontSize: '0.875rem',
                                                color: selectedAnalysis?.id === analysis.id 
                                                    ? theme.palette.mode === 'dark'
                                                        ? 'rgba(255, 255, 255, 0.7)'
                                                        : 'text.secondary'
                                                    : 'text.secondary'
                                            }}
                                        >
                                            {analysis.jobDescription}
                                        </Typography>
                                    }
                                />
                                <Stack direction="row" spacing={1}>
                                    <Chip
                                        label={analysis.aiSummary.MatchScore >= 80 ? 'Strong Match' :
                                            analysis.aiSummary.MatchScore >= 60 ? 'Good Match' : 'Low Match'}
                                        color={getScoreColor(analysis.aiSummary.MatchScore)}
                                        size="small"
                                        sx={{ 
                                            fontWeight: 500,
                                            borderRadius: 1
                                        }}
                                    />
                                    <IconButton
                                        onClick={(e) => onDeleteAnalysis(analysis.id, e)}
                                        size="small"
                                        sx={{ 
                                            width: 32,
                                            height: 32,
                                            color: 'error.main',
                                            bgcolor: theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.05)'
                                                : 'error.lighter',
                                            '&:hover': {
                                                bgcolor: 'error.main',
                                                color: 'white'
                                            }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </ListItemButton>
                            {index < analyses.length - 1 && (
                                <Divider sx={{ my: 1, opacity: 0.5 }} />
                            )}
                        </Box>
                    </Fade>
                ))}
            </List>
        </Paper>
    );
};

export default SavedAnalysesList;