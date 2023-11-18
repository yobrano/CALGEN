import React, { useContext, useState } from 'react'

const TableContext = React.createContext()

export default function SourceTableContext({ children }) {
	const [table, setTable] = useState(null)
	const [customColumns, setCustomColumns] = useState([])
	console.log("Refreshed")

	//  Record Methods  ------------------------ 
	const createRecord = (record, insertIdx)=>{
		let temp = [...table]
		if(insertIdx === undefined){
			temp.unshift(record)
		}else{
			temp.splice(insertIdx, 0, record)
		}
		setTable([...temp])
	}

	const editRecord = (recordIdx, recordDetails) =>{
		let temp = [...table]
		temp[recordIdx] = {...temp[recordIdx], ...recordDetails }
		setTable([...temp])
	}

	const deleteRecord = (recordIdx) =>{
		let temp = [...table]
		delete temp[recordIdx]
		setTable([...temp])
	}


	//  Coulumn Methods  ------------------------ 
	const deleteColumn = (columnHeader) =>{
		let temp = [...table]
		temp = temp.map((record)=>{
			let recTemp  = {...record}
			delete recTemp[columnHeader]
			return recTemp
		})
		setTable(temp)
	}

	const createColumn = (columnHeader, defaultValue ) =>{
		let temp = [...table]
		temp = temp.map((record)=>{
			let recTemp  = {...record}
			recTemp[columnHeader] = defaultValue
			return recTemp
		})
		setTable(temp)
	}

	const populateTable = (tableData) =>{
		setTable(tableData)
		setCustomColumns([])
	}
	// Context Propterties ------------------------
	const contextData = {
		table,
		customColumns,
	}

	const contextMethods = {
		//  Record Functions
		populateTable,
		createRecord,
		editRecord, 
		deleteRecord,

		//  Columns Functions
		createColumn,
		deleteColumn,
	}
	return (
		<TableContext.Provider value={{ ...contextData, ...contextMethods }} >
			{children}
		</TableContext.Provider>
	)
}

export const useSourceTable = () => useContext(TableContext)
