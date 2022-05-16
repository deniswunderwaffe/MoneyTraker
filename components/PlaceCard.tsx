import {Button, CardActions, CardContent, Typography, Card, CardMedia} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import AddPurchaseDialog from "./AddPurchaseDialog";
import Link from "next/link";

export interface PlaceCardProps {
    id: string;
    name: string;
    totalSpent: number;
    address: string;
    lastVisited?: string;
    placeType: string;
}

export default function PlaceCard(props: PlaceCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Box sx={{minWidth: 275}}>
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        height="280"
                        image={"/assets/" + "propsid" + ".png"}
                        alt="foodItem"
                    />
                    <CardContent>
                        <Typography variant="h4" color="text.primary" gutterBottom>
                            {props.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {`Total spent: ${props.totalSpent}L`}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {`Address : ${props.address}`}
                        </Typography>
                        <Typography variant="body2">
                            {props.placeType}
                            <br/>
                            {props.lastVisited ? props.lastVisited : "Have not visited yet"}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" onClick={()=>setIsDialogOpen(true)}>Add Purchase</Button>
                        <Link href={`dashboard/place/${props.id}`}>
                            <Button size="small" variant="contained">Details</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Box>
            {isDialogOpen && <AddPurchaseDialog placeId={props.id} open={isDialogOpen} handleClose={()=>setIsDialogOpen(false)}/>}
        </>
    );
}