import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import {AppContext} from "../utils/globalState";
import {useRouter} from "next/router";
import Link from 'next/link'

const Navbar = () => {
    const appContext = React.useContext(AppContext);
    const router = useRouter();
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
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </Typography>
                    {appContext.isLoggedIn && (<Button onClick={()=> {
                        localStorage.clear();
                        appContext.setIsLoggedIn(false);
                        router.push("/login");
                    }} color="inherit">Log out</Button>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;