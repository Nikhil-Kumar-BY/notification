// Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import { Menu, Notifications, Brightness4, Brightness7 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleDrawer, toggleTheme, unreadNotificationCount, currentTheme }) => {
    const navigate =  useNavigate();
    return (
        <AppBar position="static" elevation={0}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleDrawer} aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'center' }} onClick={()=> navigate('/')}>
                    Workflow
                </Typography>
                <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'right'}} onClick={()=>navigate('/signin')}>
                    Login
                </Typography>
                
                <IconButton color="inherit" onClick={toggleDrawer}>
                    <Badge badgeContent={unreadNotificationCount} color="secondary">
                        <Notifications />
                    </Badge>
                </IconButton>
               
                <IconButton color="inherit" onClick={toggleTheme}>
                    {currentTheme === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
