import React, { useContext, useState } from 'react'
import {tableApi} from '@src-utils/Endpoints'
import {useSourceTableContext} from "@src-context/SourceTableContext"
import {useSourceTableApi} from "@src-context/SourceTableApiContext"

const TempApiContext = React.createContext()


function TemplatesApiContext({ children }) {
	const [settings, setSettings] = useState(defaultSettings)
	const api = tableApi()
	const {tableID, tableName} = useSourceTableApi()
	
	const downloadBuilt = ()=> {
		let postData = { tableID, settings }
		tableApi.post( "/build", postData, { responseType: "blob"})

		.then((response)=>{
			response.data.size === 1?

			alert("Something went wrong. Could not build the data from templates."):
			downloadFromLink(response.data, `${tableName}.zip`)

			console.log("--- Build Templates Succeded.", response)
			
		}).catch((error)=>{
			console.error("--- Build Templates failed", error)
		})
	}
	const uploadTemplates = ()=> null
	const viewTemplates = ()=> null
	const updateTemplates = ()=> null


	const contextData = {
		settings,
	}

	const contextMethods = {
		downloadBuilt
	}

	return (
		<TempApiContext.Provider value= {{...contextData, ...contextMethods}} >
			{children}
		</TempApiContext.Provider>
	)
}


const defaultSettings ={
	inputFormat: "array",
	customTemplates: ["Create Item (array).j2", "empty Item.j2", "model.j2"],
	customFields: [],
}

const downloadFromLink = (fileContents, fileName)=>{

	const blob = new Blob([fileContents], { type: 'application/zip' });
	const downloadUrl = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	
	a.href = downloadUrl;
	a.download = fileName;
	a.click();
	
	window.URL.revokeObjectURL(downloadUrl);
}

export const useTemplatesApi = () => useContext(TempApiContext)

export default TemplatesApiContext