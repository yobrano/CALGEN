import React, { useContext, useState } from 'react'
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const Context = React.createContext()


export default function TokenProvider({children}) {

    const navigate = useNavigate()

    // ---------------- Datasets ----------------
    const [authTokens, setAuthTokens] = useState(()=>{
        const tokens =  tokenRetrierver()
        if(tokens !== null){
            return tokens
        }else{
            return {access: null, refresh: null}
        }
    })

    // ---------------- Methods ----------------
    const authTokenUpdateAndEmbed = (tokens)=>{
        const tokenString = JSON.stringify(tokens)
        localStorage.setItem("authTokens", encryptData(tokenString, import.meta.env.VITE_PASS_PHRASE))
        setAuthTokens(tokens)
    }

    const authTokenRetriever = ()=>{
        const tokenCypherText = localStorage.getItem("authTokens")
        if(!tokenCypherText){
            // localStorage.clear()
            console.error("Tokens could not be located.")
            navigate("/login")
        }
        const tokenString = decryptData(tokenCypherText, import.meta.env.VITE_PASS_PHRASE)
        setAuthTokens(JSON.parse(tokenString))
    }

    const authTokenRemover = ()=>{
        if(localStorage.getItem("authTokens")){
            setAuthTokens({access: null, refresh: null})
            localStorage.clear()
        }
    }
    // ---------------- Context Data  ----------------
    const data = {
        accessToken: authTokens.access,
        refreshToken: authTokens.refresh
    }

    const methods = {
        authTokenUpdateAndEmbed, 
        authTokenRetriever,
        authTokenRemover,
    }

    return (
        <Context.Provider value={{ ...data, ...methods }}>
            {children}
        </Context.Provider>
    )
}


// Context consumer hook.
export const useTokenContext = ()=>useContext(Context)


// Encription method for token.
export const encryptData = (data, encryptionKey) =>{
    const bytes = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        encryptionKey)
    const cypherText = bytes.toString();
    return cypherText
}


// Decryption method for token.
export const decryptData = (ciphertext, encryptionKey) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    try {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    catch (err) {
        return null;
    }
}

// method for storing token.
export const tokenEmbeder = (tokens)=>{
    const tokenString = JSON.stringify(tokens)
    localStorage.setItem("authTokens", encryptData(tokenString, import.meta.env.VITE_PASS_PHRASE))
    return true
}

// method for retrieving token.
export const tokenRetrierver = ()=>{
    const cypherText = localStorage.getItem("authTokens")
    if(cypherText){
        const tokenString = decryptData(cypherText, import.meta.env.VITE_PASS_PHRASE)
        return JSON.parse(tokenString)
    }else{
        return null
    }
}

export const tokenErasor = ()=> localStorage.clear();