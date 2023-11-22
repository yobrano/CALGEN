import React, { useContext } from "react";
import { useTokenContext } from "./TokenProvider";
import { endpoints } from "../utils/endpoints";
import { api } from "../utils/useProtectedEndpoint";
import { useNavigate } from "react-router-dom";

const Context = React.createContext();

function AuthenticateProvider({ children }) {
    const { accessToken, refreshToken, authTokenUpdateAndEmbed, authTokenRemover } =
        useTokenContext();
    const navigate = useNavigate()
    // ------------- Datasets -------------

    // ------------- Methods -------------
    const login = (payload) => {
        const endpoint = endpoints.accountLoginURL();
        api.post(endpoint, payload)
		.then((response) => {
            authTokenUpdateAndEmbed(response.data);
			navigate("/dashboard", {state: {msg: "success"}})

        });
    };

    const logout = () => {
        const endpoint = endpoints.accountLogoutURL();
        const payload = { refresh_token: refreshToken };
        api.post(endpoint, payload)
            .then((response) => {
				console.log(accessToken)
				if(response.status === 205){
					authTokenRemover()
				}
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const createAccount = () => {};

    const isAuthenticated = () => {
        console.log(accessToken);
        return accessToken !== null;
    };

    // ------------- Provider Assignment -------------
    const data = {};

    const methods = {
        login,
        logout,
        createAccount,
        isAuthenticated,
    };

    return (
        <Context.Provider value={{ ...data, ...methods }}>
            {children}
        </Context.Provider>
    );
}

export default AuthenticateProvider;
export const useAuthenticate = () => useContext(Context);
