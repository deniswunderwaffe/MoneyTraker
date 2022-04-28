import React, {createContext, Dispatch, Reducer, useContext, useEffect, useReducer, useState} from 'react';
import {Property} from "csstype";
import Display = Property.Display;
import {useRouter} from "next/router";
import axios from "axios";
import {useQuery} from "react-query";
import $api from "./axiosDefaults";

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
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            check();
            setIsLoggedIn(true);
        } else {
            router.push("/login")
        }
    },[])
    const check = async () => {
        const result = await axios.head("https://localhost:7143/api/authentication", {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (result.status === 401) {
            setIsLoggedIn(false);
            await router.push("/login")
        }
    }



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