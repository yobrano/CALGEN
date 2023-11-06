import React, { useState } from 'react'
import { Box, Container, TextField, Paper, Typography, Button } from '@mui/material'

import {useAuthenticate} from "../../context/AuthenticateProvider"
import { useNavigate } from 'react-router-dom'

function Login() {
	const {login} = useAuthenticate()
	const navigate = useNavigate()

	const [ userCredentials, setUserCredentials ] = useState({username: "", password: ""})
	
	// Handlers
	const userCredentialsHandler = (fieldData)=> setUserCredentials({...userCredentials, ...fieldData})
	const submissionHandler = (event) => {
		event.preventDefault()
		login(userCredentials)
		navigate("/", {state: {msg: "success"}})
	}

	return (
		<Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 7rem)"}}>
			<Paper elevation={2}>
				<Container sx={{display: "flex", flexDirection: "column", p:2}} >

					<Typography variant="h4" >Login...</Typography>
					<Box 
					 sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", p: 2,  height: "28vh"}} 
					 component={"form"}
					 onSubmit={submissionHandler}
					 >
						<TextField
							variant='standard'
							id="username"
							label="username"
							type="text"
							value = {userCredentials.username}
							onChange={(event)=>userCredentialsHandler({"username": event.target.value})}
						/>

						<TextField
							variant='standard'
							id="password"
							label="Password"
							type="password"
							value = {userCredentials.password}
							onChange={(event)=>userCredentialsHandler({"password": event.target.value})}
						/>

						<Button variant='contained' type="submit" > submit </Button>

					</Box>
				</Container>
			</Paper>
		</Box>
	)
}

export default Login