import React, { useContext, useState } from 'react'

const TableContext = React.createContext()

export default function SourceTableContext({ children }) {
	const [table, setTable] = useState(null)
	const [editRecordIdx, setEditRecordIdx] = useState(null)
	const [customColumns, setCustomColumns] = useState([])


	//  Record Methods  ------------------------ 
	const setEditingStatus = (recordIdx)=>{
		setEditRecordIdx(recordIdx)
	}

	const saveNewReacord = (record, insertIdx)=>{
		let temp = [...table]
		if(insertIdx === undefined){
			temp.unshift(record)
		}else{
			temp.splice(insertIdx, 0, record)
		}
		setTable([...temp])
	}

	const saveRecordChanges = (record, recordIdx) =>{
		let temp = [...table]
		temp[recordIdx] = record
		setTable([...temp])
		setEditRecordIdx(null)
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
		setEditRecordIdx(null)
		setCustomColumns([])
	}
	// Context Propterties ------------------------
	const contextData = {
		table,
		editRecordIdx,
		customColumns,
	}

	const contextMethods = {
		//  Record Functions
		populateTable,
		setEditingStatus,
		saveNewReacord,
		saveRecordChanges, 
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




/*
	NOTES: 
	- Use the react-table library for changing visibility of columns and thier orderling.
*/ 