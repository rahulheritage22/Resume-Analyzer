import React from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    IconButton,
    Fade,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { Resume } from '../types/resume';

interface ResumeListProps {
    resumes: Resume[];
    selectedResume: Resume | null;
    onSelectResume: (resume: Resume) => void;
    onDeleteResume: (id: string) => void;
    onViewResume: (id: string) => void;
    loading?: boolean;
}

const LoadingSkeleton = () => (
    <Box sx={{ width: '100%', animation: 'pulse 1.5s ease-in-out infinite' }}>
        <Box sx={{ height: 60, bgcolor: 'action.hover', borderRadius: 1, mb: 2 }} />
        <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1, mb: 1, width: '80%' }} />
        <Box sx={{ height: 40, bgcolor: 'action.hover', borderRadius: 1, width: '60%' }} />
    </Box>
);

const ResumeList: React.FC<ResumeListProps> = ({
    resumes,
    selectedResume,
    onSelectResume,
    onDeleteResume,
    onViewResume,
    loading = false,
}) => {
    return (
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
                                    onClick={() => onSelectResume(resume)}
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
                                            onViewResume(resume.id);
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
                                            onDeleteResume(resume.id);
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
    );
};

export default ResumeList;