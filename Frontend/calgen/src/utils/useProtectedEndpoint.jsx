import axios from 'axios'
import dayjs from "dayjs"
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { endpoints } from "./endpoints"
import { jwtDecode } from 'jwt-decode'
import { tokenRetrierver, tokenEmbeder, tokenErasor } from '../context/TokenProvider';
import { useEffect, useState } from 'react';


// Creating instance for latter customizations
export const api = axios.create({
    baseURL: endpoints.baseURL,
})


// Hook to fetch from protedted endpoints
export function useProtectedEndpoint() {
    const navigate = useNavigate()
    const [authTokens, setAuthTokens] = useState(()=>  tokenRetrierver())
    let accessTokenString = authTokens?.access   
    const accessToken = accessTokenString && jwtDecode(accessTokenString)

    // if not authenticated - use the normal api
    if(authTokens === null){
        return api
    }

    // if authenticated use portected endpoints
    api.interceptors.request.use((request) => {
        
        const expiryDate = dayjs.unix(accessToken.exp)
        const isExpired = expiryDate.diff( dayjs()) < 0

        // if expired request a new token
        if(isExpired){

            const endpoint = endpoints.accountRefreshURL()
            const postData = {refresh: authTokens.refresh}
            const config = {
                header: {Authorization: authTokens.access }
            }
            axios.post(endpoint, postData, config)
            .then((response)=>{
                tokenEmbeder(response.data)
                accessTokenString = response.data
            })
            .catch((error)=>{
                console.error(error)
                // tokenErasor()
                // navigate("/login")
            })
            
        }

        // Proceed with the authenticated tokken
        request.headers.Authorization = `Bearer ${accessTokenString}`
        return request
    })
    return api
}


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




