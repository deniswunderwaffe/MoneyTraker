import React from 'react';
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {Button, Grid, Input} from "@mui/material";
import {TextInputForm} from "../../components/form-inputs/TextInputForm";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {AppContext} from "../../utils/globalState";

type Inputs = {
    email: string,
    password: string,
};
const HOUR = 1000 * 60 * 60;

const Index = () => {
    const appContext = React.useContext(AppContext);

    const {mutate} = useMutation((data: Inputs) =>
        axios.post('https://localhost:7143/api/authentication/login', data).then(res => {
                sessionStorage.setItem("token", res.data);
                appContext.isLoggedIn = true;

                setInterval(()=>{
                    axios.post('https://localhost:7143/api/authentication/refresh-token',{oldToken:sessionStorage.getItem("token")}).then(res=>{
                        sessionStorage.setItem("token", res.data);
                    });

                },HOUR * 24) //TODO тут рефреш токена
            }
        )
    );

    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => mutate(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <TextInputForm
                        name={"email"}
                        control={control}
                        label={"Login"}
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextInputForm
                        name={"password"}
                        control={control}
                        label={"Password"}
                    />
                </Grid>
                <Grid item sm={12}>
                    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Index;