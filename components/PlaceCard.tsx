import {Button, CardActions, CardContent, Typography,Card} from "@mui/material";
import {Box} from "@mui/system";

export interface PlaceCardProps  {
    id:string;
    name:string;
    totalSpent:number;
    address:string;
    lastVisited:Date;
    placeType:string;
}
export default function PlaceCard(props:PlaceCardProps) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" color="text.primary" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {`Total spent: ${props.totalSpent}L`}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {`Address : ${props.address}`}
                    </Typography>
                    <Typography variant="body2">
                        {props.placeType}
                        <br />
                        {props.lastVisited ? props.lastVisited.toDateString() : "Have not visited yet"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
}