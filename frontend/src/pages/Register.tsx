import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Link,
    Alert,
    Fade,
    InputAdornment,
    IconButton,
    useTheme,
    Zoom,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Person,
    Description as DescriptionIcon
} from '@mui/icons-material';
import api from '../services/api';
import ThemeToggle from '../components/ThemeToggle';

const Register = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/api/v1/users', formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
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
        <Container component="main" maxWidth="xs">
            <ThemeToggle />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Zoom in={true} style={{ transitionDelay: '100ms' }}>
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DescriptionIcon
                            sx={{
                                color: 'primary.main',
                                fontSize: 40,
                                transform: 'rotate(-10deg)',
                            }}
                        />
                        <Typography
                            variant="h4"
                            component="h1"
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: -1,
                            }}
                        >
                            Resume Analyzer
                        </Typography>
                    </Box>
                </Zoom>

                <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            width: '100%',
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: theme.palette.mode === 'dark'
                                ? 'rgba(255, 255, 255, 0.03)'
                                : 'background.paper',
                        }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{ mb: 3, fontWeight: 600 }}
                        >
                            Create Account
                        </Typography>

                        {error && (
                            <Fade in={true}>
                                <Alert
                                    severity="error"
                                    sx={{
                                        mb: 2,
                                        borderRadius: 2,
                                    }}
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
                                    sx={{
                                        mb: 2,
                                        borderRadius: 2,
                                    }}
                                >
                                    Registration successful! Redirecting to login...
                                </Alert>
                            </Fade>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Full Name"
                                name="name"
                                autoComplete="name"
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
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: 'action.active' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="large"
                                                sx={{
                                                    color: 'action.active',
                                                }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    position: 'relative',
                                }}
                                disabled={loading}
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
                                                '@keyframes pulse': {
                                                    '0%': {
                                                        opacity: 0.5,
                                                        transform: 'scale(0.75)',
                                                    },
                                                    '50%': {
                                                        opacity: 1,
                                                        transform: 'scale(1)',
                                                    },
                                                    '100%': {
                                                        opacity: 0.5,
                                                        transform: 'scale(0.75)',
                                                    },
                                                },
                                            }}
                                        />
                                        <Box sx={{ width: 5, height: 5, bgcolor: 'primary.light', borderRadius: '50%' }} />
                                        <Box sx={{ width: 5, height: 5, bgcolor: 'primary.light', borderRadius: '50%' }} />
                                    </Box>
                                ) : 'Sign Up'}
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    variant="body2"
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            color: 'primary.dark',
                                        }
                                    }}
                                >
                                    Already have an account? Sign In
                                </Link>
                            </Box>
                        </form>
                    </Paper>
                </Zoom>
            </Box>
        </Container>
    );
};

export default Register;