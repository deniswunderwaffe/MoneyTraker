import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {useMutation} from "react-query";
import $api from "../utils/axiosDefaults";
import {Grid} from "@mui/material";
import {TextInputForm} from "./form-inputs/TextInputForm";
import {SubmitHandler, useForm} from "react-hook-form";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

interface AddPurchaseDialogProps{
    open:boolean;
    handleClose:()=>void;

    placeId:string;
}

interface AddPurchaseRequest {
    placeId:string;
    total:number;
    spentAt:Date;
    outcome?:string;
}
export default function AddPurchaseDialog({open,handleClose,placeId}:AddPurchaseDialogProps) {

    const {mutate} = useMutation((data: AddPurchaseRequest) =>{
            return $api.post("user/places/purchases/create",data);
        }
    );

    const {control, handleSubmit, formState: {errors}} = useForm<AddPurchaseRequest>();
    const onSubmit: SubmitHandler<AddPurchaseRequest> =  data => {
        data.placeId = placeId;
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
                                name={"total"}
                                control={control}
                                label={"Total"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextInputForm
                                name={"spentAt"}
                                control={control}
                                label={"Spent At"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextInputForm
                                name={"outcome"}
                                control={control}
                                label={"Outcome"}
                            />
                        </Grid>
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
