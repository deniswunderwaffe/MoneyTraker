import {createContext, useContext, useState} from 'react';

interface AppContextInterface {
    isLoggedIn:boolean;
    setIsLoggedIn:(value:boolean)=>void;
}

export const AppContext = createContext<AppContextInterface>({
    isLoggedIn:false,
    setIsLoggedIn: (value)=>{

    }
});

export function AppWrapper({ children }:any) {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    let sharedState:AppContextInterface = {
        isLoggedIn:isLoggedIn,
        setIsLoggedIn: setIsLoggedIn
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}