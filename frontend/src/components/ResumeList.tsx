import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemText,
    Divider,
    IconButton,
    Fade,
    Chip,
    useTheme,
    Stack,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Resume } from '../types/resume';

interface ResumeListProps {
    resumes: Resume[];
    selectedResume: Resume | null;
    onSelectResume: (resume: Resume | null) => void;
    onDeleteResume: (id: string) => void;
    onViewResume: (id: string) => void;
    loading?: boolean;
}

const LoadingSkeleton = () => {
    const theme = useTheme();
    return (
        <Stack spacing={2}>
            {[1, 2].map((item) => (
                <Box
                    key={item}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                        animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Box sx={{ width: 24, height: 24, borderRadius: '50%', bgcolor: 'action.hover' }} />
                        <Box sx={{ height: 20, bgcolor: 'action.hover', borderRadius: 1, flex: 1 }} />
                    </Box>
                    <Box sx={{ height: 16, bgcolor: 'action.hover', borderRadius: 1, width: '60%' }} />
                </Box>
            ))}
        </Stack>
    );
};

const ResumeList: React.FC<ResumeListProps> = ({
    resumes,
    selectedResume,
    onSelectResume,
    onDeleteResume,
    onViewResume,
    loading = false,
}) => {
    const theme = useTheme();

    return (
        <Paper 
            elevation={0}
            sx={{ 
                p: 3,
                minHeight: 400,
                maxHeight: 400,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 24
            }}
        >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ 
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1, 
                    borderRadius: '50%', 
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'primary.lighter',
                }}>
                    <DescriptionIcon color="primary" />
                </Box>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, flex: 1 }}>
                    Your Resumes
                </Typography>
                <Chip 
                    label={`${resumes.length} ${resumes.length === 1 ? 'Resume' : 'Resumes'}`}
                    size="small"
                    sx={{ 
                        fontWeight: 500,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'primary.lighter',
                        color: 'primary.main',
                    }}
                />
            </Box>

            {loading ? (
                <LoadingSkeleton />
            ) : resumes.length === 0 ? (
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    color: 'text.secondary',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: 'divider',
                }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            bgcolor: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)' 
                                : 'rgba(0, 0, 0, 0.03)',
                            mb: 2
                        }}
                    >
                        <DescriptionIcon sx={{ fontSize: 40, color: 'action.disabled' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        No resumes uploaded yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Upload your first resume to get started with the analysis
                    </Typography>
                </Box>
            ) : (
                <List sx={{ 
                    maxHeight: 400, 
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
                    {resumes.map((resume, index) => (
                        <Fade in={true} key={resume.id} style={{ transitionDelay: `${index * 100}ms` }}>
                            <Box>
                                <ListItemButton
                                    selected={selectedResume?.id === resume.id}
                                    onClick={() => onSelectResume(selectedResume?.id === resume.id ? null : resume)}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        transition: 'all 0.2s ease',
                                        border: '1px solid',
                                        borderColor: selectedResume?.id === resume.id 
                                            ? 'primary.main'
                                            : 'transparent',
                                        bgcolor: selectedResume?.id === resume.id
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
                                        mr: 2,
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.mode === 'dark' 
                                            ? 'rgba(255, 255, 255, 0.05)' 
                                            : 'primary.lighter',
                                    }}>
                                        <InsertDriveFileIcon sx={{ fontSize: 20, color: 'primary.main' }} />
                                    </Box>
                                    <ListItemText
                                        primary={resume.fileName}
                                        secondary={new Date(resume.uploadedAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontWeight: selectedResume?.id === resume.id ? 600 : 500,
                                                fontSize: '0.95rem',
                                                color: selectedResume?.id === resume.id ? 'primary.main' : 'text.primary'
                                            },
                                            '& .MuiListItemText-secondary': {
                                                fontSize: '0.875rem'
                                            }
                                        }}
                                    />
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewResume(resume.id);
                                            }}
                                            sx={{ 
                                                width: 32,
                                                height: 32,
                                                color: 'primary.main',
                                                bgcolor: theme.palette.mode === 'dark' 
                                                    ? 'rgba(255, 255, 255, 0.05)' 
                                                    : 'primary.lighter',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    transform: 'scale(1.1)',
                                                }
                                            }}
                                            size="small"
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteResume(resume.id);
                                            }}
                                            sx={{ 
                                                width: 32,
                                                height: 32,
                                                color: 'error.main',
                                                bgcolor: theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.05)'
                                                    : 'error.lighter',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    bgcolor: 'error.main',
                                                    color: 'white',
                                                    transform: 'scale(1.1)',
                                                }
                                            }}
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </ListItemButton>
                                {index < resumes.length - 1 && (
                                    <Divider sx={{ my: 1, opacity: 0.5 }} />
                                )}
                            </Box>
                        </Fade>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default ResumeList;