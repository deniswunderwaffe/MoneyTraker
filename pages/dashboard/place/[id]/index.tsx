import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import $api from "../../../../utils/axiosDefaults";
import {useQuery} from "react-query";
import {
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Moment from "react-moment";

interface PlaceResponse {
    id: string;
    name: string;
    totalSpent: number;
    address: string;
    lastVisited?: string;
    placeType: string;
}

interface PlacePurchasesResponse {
    items: Purchase[];
    totalItems: number;
}

interface Purchase {
    id: string;
    total: number;
    spentAt: string;
    outcome?: string;
}

const Index = () => {
    const router = useRouter();
    const id = router.query.id as string;

    const {isLoading, isSuccess, isError, data: placeData, error} =
        useQuery('place', async () => {
            return await $api.get<PlaceResponse>(`user/places/${id}`);
        }, {enabled: !!id});

    const {data: purchasesData} =
        useQuery('placePurchases', async () => {
            return await $api.get<PlacePurchasesResponse>(`user/places/${id}/purchases`);
        }, {enabled: !!id});

    return (
        <>
            {isLoading ? (<Skeleton/>) : (<><Typography variant={"h1"}>
                {placeData?.data.name}
            </Typography>
                <Typography variant={"h2"}>
                    {placeData?.data.totalSpent}
                </Typography>
                <Typography variant={"h3"}>
                    {placeData?.data.address}
                </Typography>
                <Typography variant={"h4"}>
                    {placeData?.data.lastVisited ?(<Moment format="YYYY/MM/DD">placeData?.data.lastVisited</Moment>) : "Not visited yet"}
                </Typography>
                <Typography variant={"h5"}>
                    {placeData?.data.placeType}
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Spent</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchasesData?.data.items.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.total+"L"}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Moment format="YYYY/MM/DD">{row.spentAt}</Moment>
                                    </TableCell>
                                    <TableCell align="right">{row.outcome ?? ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>)
            }
        </>
    );
};

export default Index;