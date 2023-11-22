import React, { useContext, useEffect, useState } from "react";
import { useSourceTable } from "../../../context/SourceTableContext";
import _ from "lodash";
import { useSourceTableApi } from "../../../context/SourceTableApiContext";

const BackdropContext = React.createContext();

export default function BackdropProvider({ children, ...others }) {
    /*
     * Record - a row in the source table (provide by the source table provider )
     * selected Record - Ticking or double clicking a record in the source table display appends the record to a selected record display (adds it to the end or the list)
     * Filter Fields - which row in the parent to the selected record will be filtered during a foreign key asssignment.
     * Assign Fields - which row in the source table will be assigned a value.
     */

    // Hooks ==============

    const [isPrimaryKey, setIsPrimaryKey] = useState(false);
    const [foreignKeyTable, setForeignKeyTable] = useState("");
    const [filterFields, setFilterFields] = useState([]);
    const [assignFields, setAssignFields] = useState([]);

    const [editRow, setEditRow] = useState({
        filterField: null,
        assignField: null,
    });

    const { selectedRows, closeBackdrop } = others;
    const { table, editRecord, genFKAttributes } = useSourceTable();
    const { updateTable } = useSourceTableApi();
    
    // Effects
    useEffect(() => {
        let selectedRow = selectedRows.at(-1);
        selectedRow = _.find(table, { id: selectedRow });
        if (selectedRow !== undefined) {
            setAssignFields(selectedRow.keysData.assignFields);
            setFilterFields(selectedRow.keysData.filterFields);
            setForeignKeyTable(selectedRow.keysData.foreignKeyTable)
            setIsPrimaryKey(Boolean(selectedRow["Primary Key"]))
            console.log("HELLO ", Boolean(selectedRow["Primary Key"]))
        }
    }, [selectedRows]);

    // Methods ==============
    // ============== Key properties ==============
    const tooglePrimayKey = () => {
        setIsPrimaryKey((prev) => !prev);
    };

    const handleForeignKeyTable = (tableName) => {
        setForeignKeyTable(tableName);
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

    // ============== Assignment Methods ==============
    const createAssignmentField = (fieldDetails) => {
        // commit changes to the local list
        setAssignFields([fieldDetails, ...assignFields]);
        // commit changes to parent list.
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

    // ============== Other Methods ==============
    const listEditMode = (listIndex) => {
        setEditRow({ ...editRow, ...listIndex });
    };

    const applyRecordChanges = () => {
        const FKAttirbutes = genFKAttributes(
            foreignKeyTable,
            filterFields,
            assignFields
        );
        console.log(FKAttirbutes);

        const selectedRow = selectedRows.at(-1);
        const recordIndex = _.findIndex(table, { id: selectedRow });
        editRecord(recordIndex, {
            "Foreign Key": FKAttirbutes,
            keysData: {foreignKeyTable, filterFields, assignFields, },
            "Primary Key": isPrimaryKey ? "yes" : null,
        });
        closeBackdrop()
    };
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
        applyRecordChanges,
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



