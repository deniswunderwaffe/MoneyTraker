import React, {createContext, Dispatch, useContext, useEffect, useReducer, useState} from 'react';
import {useRouter} from "next/router";
import axios from "axios";


interface AppContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    user: User;
    userReducer:Dispatch<Action>
}

interface User {
    name: string;
    totalSpent: number;
};

export const AppContext = createContext<AppContextInterface>({
    isLoggedIn: false,
    setIsLoggedIn: (value) => {

    },
    user: {} as User,
    userReducer: ()=>null
});

export enum ActionKind {
    INCREASE = 'INCREASE',
    DECREASE = 'DECREASE',
    CHANGE_NAME = 'CHANGE_NAME'
}
// An interface for our actions
interface Action {
    type: ActionKind;
    payload: any;
}


function reducer(state: User, action: Action) {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.INCREASE:
            return {
                ...state,
                value: state.totalSpent + payload,
            };
        case ActionKind.CHANGE_NAME:
            return {
                ...state,
                name: payload
            }
        case ActionKind.DECREASE:
            return {
                ...state,
                value: state.totalSpent - payload,
            };
        default:
            return state;
    }
}
const initialState:User = {
    name: "",
    totalSpent: 0
}
export function AppWrapper({children}: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userState, dispatch] = useReducer(reducer, initialState);
    useEffect(()=>{
        if(localStorage.getItem("token")){
            setIsLoggedIn(true);
        }
    })
    let sharedState: AppContextInterface = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        user:userState,
        userReducer:dispatch
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