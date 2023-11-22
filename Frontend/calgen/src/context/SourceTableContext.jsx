import React, { useContext, useState } from "react";
import { DataTableMethods } from "../utils/DataTableUtils";
const TableContext = React.createContext();

export default function SourceTableContext({ children }) {
    const [tableList, setTableList] = useState(null);
    const [table, setTable] = useState(null);
    const [customColumns, setCustomColumns] = useState([]);
    console.log("Refreshed", table);

    //  Record Methods  ------------------------
    const createRecord = (record, insertIdx) => {
        const temp = DataTableMethods.addRow_(table, insertIdx, record);
        setTable([...temp]);
    };

    const editRecord = (recordIdx, recordDetails) => {
        let temp = [...table];
        temp[recordIdx] = { ...temp[recordIdx], ...recordDetails };
        setTable([...temp]);
    };

    const deleteRecord = (recordIdx) => {
        let temp = [...table];
        temp.splice(recordIdx, 1);
        setTable([...temp]);
    };

    //  Coulumn Methods  ------------------------
    const deleteColumn = (columnHeader) => {
        let temp = [...table];
        temp = temp.map((record) => {
            let recTemp = { ...record };
            delete recTemp[columnHeader];
            return recTemp;
        });
        setTable(temp);
    };

    const createColumn = (columnHeader, defaultValue) => {
        let temp = [...table];
        temp = temp.map((record) => {
            let recTemp = { ...record };
            recTemp[columnHeader] = defaultValue;
            return recTemp;
        });
        setTable(temp);
    };

    const populateTable = (tableData) => {
        if (tableData !== null) {
            const dt = DataTableMethods.addColumn_(
                tableData,
                "keysData",
                assignKeysData
            );
            setTable(dt);
            setCustomColumns([]);
        }
    };

    const populateTableList = (tables)=>{
            setTableList(tables)
        
    }

    // Context Loading ------------------------
    const contextData = {
        table,
        tableList,
        customColumns,
    };

    const contextMethods = {
        //  Record Functions
        populateTable,
        createRecord,
        editRecord,
        deleteRecord,

        //  Columns Functions
        createColumn,
        deleteColumn,

        // Others
        populateTableList,
        genFKAttributes,
    };
    return (
        <TableContext.Provider value={{ ...contextData, ...contextMethods }}>
            {children}
        </TableContext.Provider>
    );
}

export const useSourceTable = () => useContext(TableContext);

const cleanInputType = (inputValue) => {
    console.log(inputValue);
    if (inputValue.indexOf("*") !== 0) {
        // reference to another field
        return inputValue;
    } else if (isNaN(Number(inputValue))) {
        // Constant Number
        return Number(inputValue);
    } else {
        // Constant string
        return `\""${inputValue}\""`;
    }
};

const genFKAttributes = (foreignTable, filtersList, assignmentsList) => {
    if (!foreignTable) {
        return null;
    }
    let filters = filtersList.map((item) =>
        [item.field, item.value].join(" = ")
    );
    filters = filters.join(", ");
    filters = `(${filters})`;

    let assignments = assignmentsList.map((item) =>
        [item.field, cleanInputType(item.value)].join(" = ")
    );
    assignments = assignments.join(", ");
    assignments = `{${assignments}}`;

    var result = `${foreignTable}${filters}${assignments}`;

    return result;
};

const assignKeysData = (row, index) => {
    const foreignKey = row["Foreign Key"];
    let results = {
        foreignKeyTable: "",
        filterFields: [],
        assignFields: [],
    };

    if (!foreignKey) {
        return results;
    }

    let filterStart = foreignKey.indexOf("(");
    let filterEnd = foreignKey.indexOf(")");
    let assignStart = foreignKey.indexOf("{");
    let assignEnd = foreignKey.indexOf("}");

    results = {
        foreignKeyTable: foreignKey.substring(0, filterStart),
        filterFields: foreignKey.substring(filterStart + 1, filterEnd),
        assignFields: foreignKey.substring(assignStart + 1, assignEnd),
    };

    results["filterFields"] = results["filterFields"]
        .split(",")
        .map((item) => item.trim());

    results["filterFields"] = results["filterFields"].map((item) => ({
        field: item.split("=")[0].trim(),
        value: item.split("=")[1].trim(),
    }));

    results["assignFields"] = results["assignFields"]
        .split(",")
        .map((item) => item.trim());

    results["assignFields"] = results["assignFields"].map((item) => ({
        field: item.split("=")[0].trim(),
        value: item.split("=")[1].trim(),
    }));

    return results;
};
