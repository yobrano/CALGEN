import React, { useState } from 'react'
import {useSourceTableApi} from "@src-context/SourceTableApiContext"
import { useNavigate } from 'react-router-dom'
function Upload() {

	// Hooks ================================
	const navigate = useNavigate()
	const {uploadTable} = useSourceTableApi()
	
	// States ================================
	const [selectedFile, setSelectedFile] = useState(null)

	// Handlers ================================
	const handleSelect = (event)=>{
		setSelectedFile(event.target.files[0])
	}

	const handleUpload = (event)=>{
		event.preventDefault()
		console.log("hello ")
		
		uploadTable(selectedFile)
		navigate("/build")
	}



	return (
		<div>
			<form>
				<input type="file" onChange={handleSelect} accept='.csv' />
			
				{selectedFile&&<>
					<br/>
					<strong>NAME: </strong>{selectedFile.name}<br/>
					<strong>SIZE: </strong>{selectedFile.size}B<br/>
					<strong>TYPE: </strong>{selectedFile.type}<br/>
					<button type="submit" onClick={handleUpload}> Upload </button>
				</>}
				
			</form>
		</div>
	)
}

export default Upload