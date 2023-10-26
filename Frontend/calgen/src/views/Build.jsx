import React from 'react'
import { useSourceTableApi } from '@src-context/SourceTableApiContext'
import { useTemplatesApi } from '@src-context/TemplatesApiContext'
function Build() {
	const {tableID} = useSourceTableApi()
	const {downloadBuilt} = useTemplatesApi()
	console.log(tableID)

	const handleBuild = (event)=>{
		event.preventDefault()
		downloadBuilt()
	}
		


	return (
		<div>
			<button onClick={handleBuild} > Build </button>
		</div>
	)
}

export default Build