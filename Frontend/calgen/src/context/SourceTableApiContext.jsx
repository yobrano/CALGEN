import React, { useContext, useState } from "react";
import { useProtectedEndpoint } from "../utils/useProtectedEndpoint";
import { useSourceTable } from "@src-context/SourceTableContext";
import { endpoints } from "../utils/endpoints";

export const TableApiContext = React.createContext();

export default function SourceTableApiContext({ children }) {
    const [tableID, setTableID] = useState(null);
    const [tableName, setTableName] = useState(null);
    const { populateTable, table } = useSourceTable();
    const api = useProtectedEndpoint();

    const uploadTable = (payload) => {
        const endpoint = endpoints.fileManagerURL();
        api.post(endpoint, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                setTableID(response.data.id);
                setTableName(response.data.name);
                console.log("--- Uploaded successfully", response.data);
            })

            .catch((error) => {
                console.error("--- Upload Csv failed", error);
            });
    };

    const getTable = (fileCode) => {
        const endpoint = endpoints.detailedFileManagerURL(fileCode);
        api.get(endpoint)

            .then((response) => {
                populateTable(response.data.file_contents);
                setTableID(response.data.code);
                setTableName(response.data.name);
                console.log("--- Get table successfully", response.data);
            })

            .catch((error) => {
                console.error("--- Get Table Failed", error);
            });
    };

    const updateTable = (payload) => {
        const endpoint = endpoints.detailedFileManagerURL();
        api.put(endpoint, payload)

            .then((response) => {
                console.log(response.data);
                console.log("--- Table Update successfully");
            })

            .catch((error) => {
                console.error("--- Update Table ERROR", error);
            });
    };

    // Context Details
    const contextData = {
        tableID,
        tableName,
    };

    const contextMethods = {
        uploadTable,
        getTable,
        updateTable,
    };

    return (
        <TableApiContext.Provider value={{ ...contextData, ...contextMethods }}>
            {children}
        </TableApiContext.Provider>
    );
}

export const useSourceTableApi = () => useContext(TableApiContext);
