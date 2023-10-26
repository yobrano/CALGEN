import { Box, Container, TextField, Paper, Typography, Button } from '@mui/material'
import React from 'react'

function Login() {
	return (
		<Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 7rem)"}}>
			<Paper elevation={2}>
				<Container sx={{display: "flex", flexDirection: "column", p:2}} >
					<Typography variant="h4" >Login...</Typography>
					<Box  sx={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", p: 2,  height: "28vh"}} >
						<TextField
							variant='standard'
							id="username"
							label="username"
							type="text"
						/>

						<TextField
							variant='standard'
							id="password"
							label="Password"
							type="password"
						/>

						<Button variant='contained' > submit </Button>
					
					</Box>
				</Container>
			</Paper>
		</Box>
	)
}

export default Login