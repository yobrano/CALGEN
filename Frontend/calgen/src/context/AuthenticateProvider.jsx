import React, { useContext } from 'react'
import { useTokenContext } from "./TokenProvider"
import { endpoints }from "../utils/endpoints"
import { api } from "../utils/useProtectedEndpoint"

const Context = React.createContext()

function AuthenticateProvider({ children }) {
	const { accessToken, authTokenUpdateAndEmbed } = useTokenContext()
	// ------------- Datasets -------------

	// ------------- Methods -------------
	const login = (payload) => {
		const endpoint = endpoints.accountLoginURL()
		api.post(endpoint, payload )
		.then((response)=>{
			authTokenUpdateAndEmbed(response.data)
		})
	}
	const logout = () => {

	}

	const createAccount = () => {

	}

	const isAuthenticated = () => {
		console.log(accessToken)
		return accessToken !== null
	}
	
	// ------------- Provider Assignment -------------
	const data = {

	}

	const methods = {
		login, logout, createAccount, isAuthenticated
	}

	return (
		<Context.Provider value={{ ...data, ...methods }}>
			{children}
		</Context.Provider>
	)
}

export default AuthenticateProvider
export const useAuthenticate = ()=> useContext(Context)