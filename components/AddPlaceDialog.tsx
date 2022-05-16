import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useMutation, useQuery} from "react-query";
import $api from "../utils/axiosDefaults";
import {Grid, MenuItem, Select} from "@mui/material";
import {TextInputForm} from "./form-inputs/TextInputForm";
import {SubmitHandler, useForm} from "react-hook-form";
import {SelectInputForm} from "./form-inputs/SelectInputForm";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

interface AddPlaceDialogProps {
    open: boolean;
    handleClose: () => void;
}

interface AddPlaceRequest {
    name: string;
    address: string;
    placeTypeId: string;
}

interface Place {
    id: string;
    name: string;
}

interface PlaceTypesResponse {
    items: Place[];
    totalItems: number;
}

export default function AddPlaceDialog({open, handleClose}: AddPlaceDialogProps) {

    const {mutate} = useMutation((data: AddPlaceRequest) => {
            return $api.post("user/places/create", data);
        }
    );

    const {data} =
        useQuery('place types', async () => {
            return await $api.get<PlaceTypesResponse>('place/types');
        });

    const {control, handleSubmit, formState: {errors}} = useForm<AddPlaceRequest>();
    const onSubmit: SubmitHandler<AddPlaceRequest> = data => {
        mutate(data);
        handleClose();
    };


    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add Purchase"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Fill the required data
                    </DialogContentText>
                </DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <TextInputForm
                                name={"name"}
                                control={control}
                                label={"Name    "}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextInputForm
                                name={"address"}
                                control={control}
                                label={"Address"}
                            />
                        </Grid>
                        {data && (
                            <Grid item sm={12}>
                                <SelectInputForm
                                    name={"placeType"}
                                    control={control}
                                    label={"Place Type"}
                                    options={data?.data.items!}/>
                            </Grid>)
                        }
                        <Grid item sm={12}>
                            <DialogActions>
                                <Button onClick={
                                    handleSubmit(onSubmit)
                                }>Confirm</Button>
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </div>
    );
}
