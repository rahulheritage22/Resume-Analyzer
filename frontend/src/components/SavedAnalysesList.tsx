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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SavedAnalysis } from '../types/analysis';

interface SavedAnalysesListProps {
    analyses: SavedAnalysis[];
    selectedAnalysis: SavedAnalysis | null;
    onViewAnalysis: (analysis: SavedAnalysis) => void;
    onDeleteAnalysis: (id: string, event: React.MouseEvent) => void;
}

const SavedAnalysesList: React.FC<SavedAnalysesListProps> = ({
    analyses,
    selectedAnalysis,
    onViewAnalysis,
    onDeleteAnalysis,
}) => {
    if (analyses.length === 0) return null;

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                Previous Analyses
            </Typography>
            <List>
                {analyses.map((savedAnalysis, index) => (
                    <Box key={savedAnalysis.id}>
                        <ListItemButton
                            onClick={() => onViewAnalysis(savedAnalysis)}
                            selected={selectedAnalysis?.id === savedAnalysis.id}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                transition: 'all 0.2s ease',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },
                                    '& .MuiTypography-root': {
                                        color: 'inherit'
                                    },
                                    '& .MuiTypography-colorTextSecondary': {
                                        color: 'primary.contrastText'
                                    }
                                }
                            }}
                        >
                            <ListItemText
                                primary={`Match Score: ${savedAnalysis.aiSummary.MatchScore}%`}
                                secondary={
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            mt: 0.5
                                        }}
                                    >
                                        {savedAnalysis.jobDescription}
                                    </Typography>
                                }
                            />
                            <Chip
                                label={savedAnalysis.aiSummary.MatchScore >= 80 ? 'Strong Match' :
                                    savedAnalysis.aiSummary.MatchScore >= 60 ? 'Good Match' : 'Low Match'}
                                color={savedAnalysis.aiSummary.MatchScore >= 80 ? 'success' :
                                    savedAnalysis.aiSummary.MatchScore >= 60 ? 'warning' : 'error'}
                                size="small"
                                sx={{ ml: 2 }}
                            />
                            <IconButton
                                onClick={(e) => onDeleteAnalysis(savedAnalysis.id, e)}
                                sx={{ ml: 1 }}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemButton>
                        {index < analyses.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                ))}
            </List>
        </Paper>
    );
};

export default SavedAnalysesList;