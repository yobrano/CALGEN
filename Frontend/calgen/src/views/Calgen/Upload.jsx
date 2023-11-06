import React, { useState } from "react";
import { useSourceTableApi } from "../../context/SourceTableApiContext";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    // Hooks ================================
    const navigate = useNavigate();
    const { uploadTable } = useSourceTableApi();

    // States ================================
    const [selectedFile, setSelectedFile] = useState({
        upload: null,
        category: 1,
    });

    // Handlers ================================
    const handleSelect = (event) => {
        setSelectedFile((prev) => ({
            ...prev,
            upload: event.target.files[0],
        }));
    };

    const handleUpload = (event) => {
        event.preventDefault();
        console.log(selectedFile)
        uploadTable(selectedFile);
        // navigate("/build");
    };

    return (
        <div>
            <form>
                <input type="file" onChange={handleSelect} accept=".csv" />

                {selectedFile.upload && (
                    <>
                        <br />
                        <strong>NAME: </strong>
                        {selectedFile.upload.name}
                        <br />
                        <strong>SIZE: </strong>
                        {selectedFile.upload.size} Bytes
                        <br />
                        <strong>TYPE: </strong>
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
