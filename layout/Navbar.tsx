import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import {AppContext} from "../utils/globalState";

const Navbar = () => {
    const appContext = React.useContext(AppContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        Test
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {appContext.isLoggedIn && (<Button onClick={()=> {
                        sessionStorage.clear();
                        appContext.setIsLoggedIn(false);
                    }} color="inherit">Log out</Button>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;