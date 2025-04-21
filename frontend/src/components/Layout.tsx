import React, { useState } from 'react';
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
    Menu,
    MenuItem,
    Tooltip,
    Fade,
    Zoom,
    Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaletteIcon from '@mui/icons-material/Palette';
import { useColorMode } from '../theme/ColorModeContext';
import ThemeSettings from './ThemeSettings';
import EditProfile from './EditProfile';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleColorMode, mode } = useColorMode();
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
    const [themeSettingsOpen, setThemeSettingsOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setMobileMenuAnchor(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ px: { xs: 0 }, gap: 2 }}>
                        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flex: 1,
                                    gap: 1.5,
                                }}
                            >
                                <DescriptionIcon
                                    sx={{
                                        color: 'primary.main',
                                        fontSize: 32,
                                        transform: 'rotate(-10deg)',
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        color: 'text.primary',
                                        fontWeight: 600,
                                        letterSpacing: -0.5,
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    Resume Analyzer
                                </Typography>
                            </Box>
                        </Zoom>

                        {isMobile ? (
                            <>
                                <IconButton
                                    color="primary"
                                    onClick={handleMobileMenu}
                                    sx={{ ml: 'auto' }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={mobileMenuAnchor}
                                    open={Boolean(mobileMenuAnchor)}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    sx={{
                                        '& .MuiPaper-root': {
                                            borderRadius: 2,
                                            minWidth: 180,
                                            boxShadow: theme.shadows[3],
                                        },
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        setEditProfileOpen(true);
                                    }}>
                                        <AccountCircleIcon sx={{ mr: 2 }} />
                                        Edit Profile
                                    </MenuItem>
                                    <MenuItem onClick={toggleColorMode}>
                                        {mode === 'dark' ? (
                                            <>
                                                <Brightness7Icon sx={{ mr: 2 }} />
                                                Light Mode
                                            </>
                                        ) : (
                                            <>
                                                <Brightness4Icon sx={{ mr: 2 }} />
                                                Dark Mode
                                            </>
                                        )}
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        setThemeSettingsOpen(true);
                                    }}>
                                        <PaletteIcon sx={{ mr: 2 }} />
                                        Customize Theme
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 2 }} />
                                        Sign Out
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Edit Profile">
                                    <IconButton
                                        onClick={() => setEditProfileOpen(true)}
                                        sx={{
                                            bgcolor: 'action.hover',
                                            '&:hover': {
                                                bgcolor: 'action.selected',
                                            },
                                            p: 1.5,
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            '& svg': {
                                                fontSize: '1.25rem',
                                            }
                                        }}
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                                    <IconButton
                                        onClick={toggleColorMode}
                                        sx={{
                                            bgcolor: 'action.hover',
                                            '&:hover': {
                                                bgcolor: 'action.selected',
                                            },
                                            p: 1.5,
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            '& svg': {
                                                fontSize: '1.25rem',
                                            }
                                        }}
                                    >
                                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Customize Theme">
                                    <IconButton
                                        onClick={() => setThemeSettingsOpen(true)}
                                        sx={{
                                            bgcolor: 'action.hover',
                                            '&:hover': {
                                                bgcolor: 'action.selected',
                                            },
                                            p: 1.5,
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            '& svg': {
                                                fontSize: '1.25rem',
                                            }
                                        }}
                                    >
                                        <PaletteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Button
                                    onClick={handleLogout}
                                    variant="outlined"
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Container
                component="main"
                maxWidth="lg"
                sx={{
                    mt: { xs: 2, sm: 4 },
                    mb: 4,
                    flex: 1,
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
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 0.5,
                        }}
                    >
                        <DescriptionIcon fontSize="small" />
                        © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
                    </Typography>
                </Container>
            </Box>

            <ThemeSettings
                open={themeSettingsOpen}
                onClose={() => setThemeSettingsOpen(false)}
            />

            <EditProfile
                open={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
            />
        </Box>
    );
};

export default Layout;