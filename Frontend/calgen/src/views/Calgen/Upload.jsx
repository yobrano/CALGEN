import React, { useState } from "react";
import { useSourceTableApi } from "../../context/SourceTableApiContext";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    // Hooks ================================
    const navigate = useNavigate();
    const { uploadTable, getTableList } = useSourceTableApi();

    // States ================================
    const [selectedFile, setSelectedFile] = useState({
        upload: null,
        category: 1,
    });

    // Handlers ================================
    const handleSelect = (event) => {
        const file = event.target.files[0]
        if(file.type === "text/csv"){
            setSelectedFile((prev) => ({
                ...prev,
                upload: event.target.files[0],
            }));
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();
        uploadTable(selectedFile);
        setSelectedFile({
            upload: null,
            category: 1,
        })
        
        
    };

    return (
        <div>
            <form>
                <input type="file" onChange={handleSelect} accept=".csv" placeholder="upload file" />

                {selectedFile.upload && (
                    <>
                        <br />
                        <i>NAME: </i>
                        {selectedFile.upload.name}
                        <br />
                        <i>SIZE: </i>
                        {selectedFile.upload.size} Bytes
                        <br />
                        <i>TYPE: </i>
                        {selectedFile.upload.type}
                        <br />
                        
                        <button type="submit" onClick={handleUpload}>
                            Upload
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}
