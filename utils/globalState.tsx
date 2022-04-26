import { createContext, useContext } from 'react';

interface AppContextInterface {
    isLoggedIn:boolean
}

export const AppContext = createContext<AppContextInterface>({
    isLoggedIn:false
});

export function AppWrapper({ children }:any) {
    let sharedState = {
        isLoggedIn:false
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