import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    Box,
    Fade,
    InputAdornment,
} from '@mui/material';
import { Person, Email } from '@mui/icons-material';
import api from '../services/api';

interface EditProfileProps {
    open: boolean;
    onClose: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (open) {
            fetchUserProfile();
        }
    }, [open]);

    const fetchUserProfile = async () => {
        try {
            const response = await api.get('/api/v1/users/me');
            setFormData({
                name: response.data.name,
                email: response.data.email,
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch profile');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await api.put('/api/v1/users/me', formData);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 600 }}>Edit Profile</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Fade in={true}>
                            <Alert 
                                severity="error" 
                                sx={{ mb: 2, borderRadius: 2 }}
                                onClose={() => setError('')}
                            >
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    {success && (
                        <Fade in={true}>
                            <Alert 
                                severity="success" 
                                sx={{ mb: 2, borderRadius: 2 }}
                            >
                                Profile updated successfully!
                            </Alert>
                        </Fade>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            required
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: 'action.active' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email sx={{ color: 'action.active' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={onClose}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            position: 'relative',
                        }}
                    >
                        {loading ? (
                            <Box sx={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <Box
                                    sx={{
                                        width: 5,
                                        height: 5,
                                        bgcolor: 'primary.light',
                                        borderRadius: '50%',
                                        animation: 'pulse 1s ease-in-out infinite',
                                        '&:nth-of-type(2)': {
                                            animationDelay: '0.2s',
                                        },
                                        '&:nth-of-type(3)': {
                                            animationDelay: '0.4s',
                                        },
                                    }}
                                />
                                <Box sx={{ width: 5, height: 5, bgcolor: 'primary.light', borderRadius: '50%' }} />
                                <Box sx={{ width: 5, height: 5, bgcolor: 'primary.light', borderRadius: '50%' }} />
                            </Box>
                        ) : 'Save Changes'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditProfile;