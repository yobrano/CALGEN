import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthenticate } from '../context/AuthenticateProvider'

function ProtectedView() {
    // ADD Roles authentication. 
    const {isAuthenticated} = useAuthenticate()
    const navigate = useNavigate()
    useEffect(()=>{

        if( !isAuthenticated() )
        {
            return navigate("/login", {params:{next: "insert path here." }})
        }
    }, [])

    return (
        <><Outlet/></>
    )
}

export default ProtectedView