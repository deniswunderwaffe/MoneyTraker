import React, {useContext} from 'react';
import Navbar from "./Navbar";
import {AppContext,} from "../utils/globalState";

export default function Layout({ children } : any) {
    return (
        <>
            <Navbar />
            <main style={{margin:"25px"}}>
                {children}
            </main>
        </>
    );
};
