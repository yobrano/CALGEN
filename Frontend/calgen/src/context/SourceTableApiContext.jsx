import React, {  useContext, useState } from 'react'
import {tableApi} from "@src-utils/Endpoints"
import {useSourceTableContext} from "@src-context/SourceTableContext"

export const TableApiContext = React.createContext()

function SourceTableApiContext({children}) {
	const [tableID, setTableID] = useState(null)
	const [tableName, setTableName] = useState(null)
	const {populateTable, table} = useSourceTableContext()

	const uploadTable = (file, func) => {
		tableApi.post( "/table", { file }, { headers: { 'Content-Type': 'multipart/form-data' } })
		
		.then((response)=>{
			setTableID(response.data.id)
			setTableName(response.data.name)
			console.log("--- Uploaded successfully", response.data)
			if(func)return func(response.data)
		})
		
		.catch((error)=>{
			console.error("--- Upload Csv failed", error)
		})

	}

	const getTable = () => {
		tableApi.get(`/table/${tableID}`)

		.then((response)=>{
			populateTable(response.data.table)
			setTableID(response.data.id)
			setTableName(response.data.name)
			console.log("--- Get table successfully", response.data)
		})
		
		.catch((error)=>{
			console.error("--- Get Table Failed", error)
		})
	}

	const updateTable = () => {
		tableApi.put(`/table/${tableID}`, {table})
		.then((response)=>{
			console.log(response.data)
			console.log("--- Table Update successfully")

		}).catch((error)=>{
			console.error("--- Update Table ERROR", error)
		})
	}

	// Context Details
	const contextData = {
		tableID,
		tableName
	}

	const contextMethods = {
		uploadTable,
		getTable,
		updateTable,
	}

	return (
		<TableApiContext.Provider  value= {{...contextData, ...contextMethods}} >
			{children}
		</TableApiContext.Provider>
	)
}


export const useSourceTableApi = () => useContext(TableApiContext)

export default SourceTableApiContext