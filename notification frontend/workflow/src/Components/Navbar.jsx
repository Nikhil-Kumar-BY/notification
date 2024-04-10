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
                <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: 'right'}} onClick={
                    
                    ()=>{
                        console.log("clicked")
                        console.log(localStorage.getItem("token"))
                        if(localStorage.getItem("token")===null){
                           // console.log("inside")
                        navigate('/signin')
                        }
                      else{
                        console.log("elseee")
                        const data=fetch("http://localhost:8081/api/unsub/"+localStorage.getItem("userid"))
                        localStorage.clear()
                      //  const data=fetch("http://localhost:8081/api/unsub/"+localStorage.getItem("userid"))
                        //console.log(data)
                        navigate("/signin")
                        }
                    }}>
                    {
                   localStorage.getItem("token")===null ?"LOGIN" :"Logout"
                        
                    }
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
