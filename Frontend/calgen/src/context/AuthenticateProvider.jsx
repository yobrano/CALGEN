import React from 'react'
import {useTokenContext} from "./TokenProvider"
const Context = React.createContext()

function AuthenticateProvider({children}) {
    const {authTokenEmbeder} = useTokenContext()
    
    // ------------- Datasets -------------
    
    // ------------- Methods -------------
    // Login
    const login = ()=>{

    }
    // Logout
    
    
    // ------------- Provider Assignment -------------
    const data = {

    }

    const methods = {

    }

  return (
    <Context.Provider value={{...data, ...methods}}>
        {children}
    </Context.Provider>
  )
}

export default AuthenticateProvider