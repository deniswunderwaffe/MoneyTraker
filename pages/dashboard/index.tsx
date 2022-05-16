import React, {useEffect, useState} from 'react';
import {AppContext} from "../../utils/globalState";
import {useRouter} from "next/router";
import {useQuery} from 'react-query';
import {Box, Button, Divider, Fab, Grid, Menu, MenuItem, Skeleton} from "@mui/material";
import $api from "../../utils/axiosDefaults";
import axios from "axios";
import PlaceCard, {PlaceCardProps} from "../../components/PlaceCard";
import AddPlaceDialog from "../../components/AddPlaceDialog";

const Index = () => {

    const {isLoading, data} =
        useQuery('places', async () => {
            return await $api.get('user/places');
        });

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isAddPlaceDialogOpen,setIsAddPlaceDialogOpen] = useState(false);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            {isLoading ? (<Skeleton/>) : (
                <>
                    <Box sx={{ margin:"20px"}}>
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                        >
                            Options
                        </Button>
                        <Menu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={()=> {
                                handleClose()
                                setIsAddPlaceDialogOpen(true);
                            }} disableRipple>
                                Add Place
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                Duplicate
                            </MenuItem>
                            <Divider sx={{my: 0.5}}/>
                            <MenuItem onClick={handleClose} disableRipple>
                                Archive
                            </MenuItem>
                            <MenuItem onClick={handleClose} disableRipple>
                                More
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {data &&
                            data.data.items.map((x: PlaceCardProps) => (
                                <Grid item xs={2} sm={4} md={4} key={x.id}>
                                    <PlaceCard key={x.id}{...x}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </>
            )}
            {isAddPlaceDialogOpen && (
                <AddPlaceDialog open={isAddPlaceDialogOpen} handleClose={()=>setIsAddPlaceDialogOpen(false)}/>
            )}
        </>
    );
};

export default Index;