import React, { useContext, useState } from 'react'

const Context = React.createContext()

function TokenProvider({children}) {
    

    // ---------------- Datasets ----------------
    const [authTokens, setAuthTokens] = useState({access: null, refresh: null})

    // ---------------- Methods ----------------
    const authTokenEmbeder = (tokens)=>{
        const tokenString = JSON.stringify(tokens)
        localStorage.setItem("authTokens", tokenString)
        setAuthTokens(tokens)
    }

    const authTokenRetriever = ()=>{
        const tokenString = localStorage.getItem("authTokens")
        setAuthTokens(JSON.parse(tokenString))
    }


    // ---------------- Context Data  ----------------
    const data = {
        accessToken: authTokens.access,
        refreshToken: authTokens.refresh
    }

    const methods = {
        authTokenEmbeder, 
        authTokenRetriever
    }

    return (
        <Context.Provider value={{ ...data, ...methods }}>
            {children}
        </Context.Provider>
    )
}

export const useTokenContext = ()=>useContext(TokenProvider)
export default TokenProvider