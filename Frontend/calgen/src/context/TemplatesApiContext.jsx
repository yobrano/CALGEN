import React, { useContext, useState, useEffect } from "react";
import { useProtectedEndpoint } from "../utils/useProtectedEndpoint";
import { useSourceTable } from "./SourceTableContext";
import { useSourceTableApi } from "./SourceTableApiContext";
import { endpoints } from "../utils/endpoints";

const TempApiContext = React.createContext();

function TemplatesApiContext({ children }) {
    // Hooks =====================
    const api = useProtectedEndpoint();
    const { tableID, tableName, updateTable } = useSourceTableApi();
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        let name = tableName.split(".")[0];
        name = name.replace(" ", "");
        setConfig({ ...defaultConfig, tableName: name });
    }, [tableName]);

    // Methods =====================
    const changeConfig = (updatedConfig) => setConfig(updatedConfig);
    const build = () => {
        updateTable()
        const postData = { ...config };
        const endpoint = endpoints.buildTable(tableID);

        api.post(endpoint, postData, { responseType: "blob" })
            .then((response) => {
                console.log(response);
				let fileName = tableName.split(".")[0];
				fileName = fileName.replace(" ", "");
                response.data.size === 1
                    ? alert(
                          "Something went wrong. Could not build the data from templates."
                      )
                    : downloadFromLink(response.data, `${fileName}.zip`);

                console.log("--- Build Templates Succeded.", response);
            })
            .catch((error) => {
                console.error("--- Build Templates failed", error);
            });
    };
    const uploadTemplates = () => null;
    const viewTemplates = () => null;
    const updateTemplates = () => null;

    // Context Data =====================
    const contextData = { config };

    // Context Methods =====================
    const contextMethods = {
        build,
        changeConfig,
    };

    return (
        <TempApiContext.Provider value={{ ...contextData, ...contextMethods }}>
            {children}
        </TempApiContext.Provider>
    );
}

const downloadFromLink = (fileContents, fileName) => {
    const blob = new Blob([fileContents], { type: "application/zip" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = downloadUrl;
    a.download = fileName;
    a.click();

    window.URL.revokeObjectURL(downloadUrl);
};

export const useTemplatesApi = () => useContext(TempApiContext);

export default TemplatesApiContext;
const defaultConfig = {
    tableName: "",
    inputFormat: "array",
    customTemplates: ["Create Item (array).j2", "empty Item.j2", "model.j2"],
    customFields: [],
};
