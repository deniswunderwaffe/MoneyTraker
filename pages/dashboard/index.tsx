import React, {useEffect} from 'react';
import {AppContext} from "../../utils/globalState";
import {useRouter} from "next/router";
import {useQuery} from 'react-query';
import {Button, Skeleton} from "@mui/material";
import axios from "axios";

const Index = () => {
    useEffect(() => {
        if (!appContext.isLoggedIn) router.push("/login")
    })

    const appContext = React.useContext(AppContext);
    const router = useRouter();
    let token:any = "";
    try {
        token = sessionStorage.getItem("token");
    }
    catch (e){

    }

    const {isLoading, isSuccess, isError, data, error, refetch} =
        useQuery('query-tutorials', async () => {
            return await axios.get('https://localhost:7143/api/user/places',{
                headers: {
                    Authorization: 'Bearer ' + token
                }});
        },{enabled:!!token});
    return (
        <>
            {isLoading && (<Skeleton></Skeleton>)}
            {data &&
                data.data.items.map((x:any)=>(
                    <div key = {x.id}>{x.name}</div>
                ))
            }
        </>
    );
};

export default Index;