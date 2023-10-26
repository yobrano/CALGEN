import React from 'react'
import useProtectedApi from '../utils/useProtectedApi'
import { endpoints } from '../utils/Endpoints'

function Text() {

	const api = useProtectedApi()
	const {fileMangerURL} = endpoints

	const endpoint = fileMangerURL()

	api.get(endpoint)
	.then((response)=>{
		console.log(response.data)
	})
	.catch((error)=>{
		console.error(error)
	})

	return (
		<div>
			Hello There.
		</div>
	)
}

export default Text