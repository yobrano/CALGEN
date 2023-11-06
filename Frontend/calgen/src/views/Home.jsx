import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthenticate } from '../context/AuthenticateProvider'

function Home() {
	const {isAuthenticated} = useAuthenticate()
	
	return (
		<div>
			<Link to="/upload"> Hello </Link>
			{isAuthenticated()?
			<>
			<Link to="/dashboard"> Dashboard </Link>
			</>
			:<Link to="/login"> Login </Link>
		}
		</div>
	)
}

export default Home