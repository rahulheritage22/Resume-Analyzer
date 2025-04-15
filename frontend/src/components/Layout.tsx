import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    useTheme,
    useMediaQuery,
    IconButton,
    Tooltip,
    Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../theme/ColorModeContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleColorMode } = useColorMode();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ px: { xs: 0 } }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flex: 1
                            }}
                        >
                            <DescriptionIcon
                                sx={{
                                    mr: 1.5,
                                    color: 'primary.main',
                                    fontSize: 28
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 600,
                                    letterSpacing: -0.5
                                }}
                            >
                                Resume Analyzer
                            </Typography>
                        </Box>

                        <IconButton
                            sx={{
                                mr: 2,
                                color: 'text.primary'
                            }}
                            onClick={toggleColorMode}
                        >
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>

                        <Button
                            onClick={handleLogout}
                            startIcon={isMobile ? undefined : <LogoutIcon />}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 500,
                                minWidth: isMobile ? '40px' : 'auto',
                                p: isMobile ? 1 : undefined
                            }}
                        >
                            {isMobile ? <LogoutIcon /> : 'Sign Out'}
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    mt: { xs: 2, sm: 4 },
                    mb: 4,
                    flex: 1
                }}
            >
                {children}
            </Container>

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: 'background.paper',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                    >
                        © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;