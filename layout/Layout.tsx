import React, {useContext} from 'react';
import Navbar from "./Navbar";
import Login from "../pages/login";
import {AppContext,} from "../utils/globalState";

export default function Layout({ children } : any) {
    const appContext = useContext(AppContext)

    return (
        <>
            <Navbar />
            <main style={{margin:"25px"}}>
                {/*{children.type == Login ? children : (appContext.isLoggedIn ? children : <div>Loading</div>)}*/}
                {children}
            </main>
        </>
    );
};
