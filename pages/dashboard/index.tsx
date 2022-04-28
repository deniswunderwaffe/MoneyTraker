import React, {useEffect} from 'react';
import {AppContext} from "../../utils/globalState";
import {useRouter} from "next/router";
import {useQuery} from 'react-query';
import {Button, Grid, Skeleton} from "@mui/material";
import $api from "../../utils/axiosDefaults";
import axios from "axios";
import PlaceCard, {PlaceCardProps} from "../../components/PlaceCard";

const Index = () => {

    const {isLoading, isSuccess, isError, data, error, refetch} =
        useQuery('query-tutorials', async () => {
            return await $api.get('user/places');
        });
    return (
        <>
            {isLoading ? (<Skeleton/>) : (
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {data &&
                        data.data.items.map((x: PlaceCardProps) => (
                            <Grid item xs={2} sm={4} md={4} key={x.id}>
                                <PlaceCard key={x.id}{...x}/>
                            </Grid>
                        ))
                    }
                </Grid>)}

        </>
    );
};

export default Index;