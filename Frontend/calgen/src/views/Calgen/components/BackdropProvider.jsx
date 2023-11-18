import React, { useContext, useState } from "react";
import { useSourceTable } from "../../../context/SourceTableContext";

const BackdropContext = React.createContext();

export default function BackdropProvider({ children, ...others }) {
    /*
     * Record - a row in the source table (provide by the source table provider )
     * selected Record - Ticking or double clicking a record in the source table display appends the record to a selected record display (adds it to the end or the list)
     * Filter Fields - which row in the parent to the selected record will be filtered during a foreign key asssignment.
     * Assign Fields - which row in the source table will be assigned a value.
     */

    // Hooks ==============
    const { selectedRows } = others;
    const [assignFields, setAssignFields] = useState([
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "sdf",
            "value": "asdf"
        }
    ]);
    const [filterFields, setFilterFields] = useState([
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "asdf",
            "value": "asdf"
        },
        {
            "field": "sdf",
            "value": "asdf"
        }
    ]);
    const [isPrimaryKey, setIsPrimaryKey] = useState(false);
    const [foreignKeyTable, setForeignKeyTable] = useState("");

    const [editRow, setEditRow] = useState({
        filterField: null,
        assignField: null,
    });
    const { table } = useSourceTable();

    // Methods ==============
    // ============== Assignment Methods ==============
    const createAssignmentField = (fieldDetails) => {
        // commit changes to the local list
        setAssignFields([fieldDetails, ...assignFields]);
        // commit changes to parent list.

        console.log([fieldDetails, ...assignFields]);
    };

    const editAssignmentField = (fieldId, fieldDetails) => {
        let temp = [...assignFields];
        temp[fieldId] = fieldDetails;
        // temp.splice(fieldId, 1, fieldDetails) // *** fancy
        setAssignFields(temp);
    };

    const deleteAssignmentField = (fieldId) => {
        let temp = [...assignFields];
        temp.splice(fieldId, 1); // Don't use delete.
        setAssignFields(temp);
    };

    // ============== Filter Methods ==============
    const createFilterField = (fieldDetails) => {
        setFilterFields([fieldDetails, ...filterFields]);
    };

    const editFilterField = (fieldId, fieldDetails) => {
        let temp = [...filterFields];
        temp[fieldId] = fieldDetails;
        setFilterFields(temp);
    };

    const deleteFilterField = (fieldId) => {
        let temp = [...filterFields];
        temp.splice(fieldId, 1);
        setFilterFields(temp);
    };

    // ============== Key properties ==============
    const tooglePrimayKey = () => {
        setIsPrimaryKey((prev) => !prev);
    };

    const handleForeignKeyTable = (tableName) => {
        setForeignKeyTable(tableName);
    };
    // ============== Other Methods ==============
    const listEditMode = (listIndex) => {
        setEditRow({ ...editRow, ...listIndex });
    };

    const handleApplyChanges = ()=>{
        console.log("Applying Changes ....")
    }
    // Context Loading ==============
    const contextData = {
        assignFields,
        filterFields,
        editRow,
        isPrimaryKey,
        foreignKeyTable,
    };
    
    const contextMethods = {
        // Assignment Fields
        createAssignmentField,
        editAssignmentField,
        deleteAssignmentField,

        // Filter Fields
        createFilterField,
        editFilterField,
        deleteFilterField,

        tooglePrimayKey,
        handleForeignKeyTable,
        
        // Others
        listEditMode,
        handleApplyChanges,
    };

    return (
        <BackdropContext.Provider
            value={{ ...contextData, ...contextMethods, ...others }}
        >
            {children}
        </BackdropContext.Provider>
    );
}

export const useBackdropContext = () => useContext(BackdropContext);
