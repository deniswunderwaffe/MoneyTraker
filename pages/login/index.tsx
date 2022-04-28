import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {Button, Grid, Input} from "@mui/material";
import {TextInputForm} from "../../components/form-inputs/TextInputForm";
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {ActionKind, AppContext} from "../../utils/globalState";
import {useRouter} from "next/router";

type Inputs = {
    email: string,
    password: string,
};
const HOUR = 1000 * 60 * 60;

const Index = () => {
    const appContext = React.useContext(AppContext);
    const router = useRouter();
    const {mutate} = useMutation((data: Inputs) =>
        axios.post('https://localhost:7143/api/authentication/login', data).then(res => {
                localStorage.setItem("token", res.data);
                appContext.setIsLoggedIn(true);
                appContext.userReducer({type:ActionKind.CHANGE_NAME,payload:res.data.name})
                router.push("http://localhost:3000/dashboard");
            }
        )
    );

    const {control, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> =  data => {
        mutate(data);
    };

    return (
        <>
            {appContext.isLoggedIn ? (<div>Already logged in</div>)
                :
                (
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
                )}

        </>
    );
};

export default Index;