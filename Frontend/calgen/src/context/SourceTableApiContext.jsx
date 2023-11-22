import React, { useContext, useState } from "react";
import { useProtectedEndpoint } from "../utils/useProtectedEndpoint";
import { useSourceTable } from "./SourceTableContext";
import { endpoints } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";

export const TableApiContext = React.createContext();

export default function SourceTableApiContext({ children }) {
    const [tableID, setTableID] = useState("");
    const [tableName, setTableName] = useState("");

    const [uploads, setUploads] = useState(null);
    const navigate = useNavigate()

    const { populateTable, populateTableList, table } = useSourceTable();
    const api = useProtectedEndpoint();

    const uploadTable = (payload, callback) => {
        const endpoint = endpoints.fileManagerURL();
        api.post(endpoint, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((response) => {
                setTableID(response.data.id);
                setTableName(response.data.name);
                navigate("/table",{state: {code: response.data.code}})
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
                console.log("Response: ", response.data.file_contents);
            })

            .catch((error) => {
                console.error(
                    "An error occured while getting table contents.",
                    error
                );
            });
    };
    const getTableList = ()=>{
        const endpoint = endpoints.fileManagerURL();
        api.get(endpoint)
            .then((response) => {
                populateTableList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const updateTable = () => {
        const endpoint = endpoints.detailedFileManagerURL(tableID);
        const payload = {
            table:table,
        };
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
        getTableList,
        updateTable,
    };

    return (
        <TableApiContext.Provider value={{ ...contextData, ...contextMethods }}>
            {children}
        </TableApiContext.Provider>
    );
}

export const useSourceTableApi = () => useContext(TableApiContext);
