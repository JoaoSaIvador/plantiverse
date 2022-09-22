import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from './api/ProductsAPI';
import UserAPI from "./api/UserAPI";
import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');

        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('users/refreshToken');

                setToken(res.data.accesstoken);
            };

            refreshToken();
        }
    }, []);

    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token)
    };

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    );
};