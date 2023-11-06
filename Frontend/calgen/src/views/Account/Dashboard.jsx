import React, { useEffect, useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { useProtectedEndpoint } from "../../utils/useProtectedEndpoint";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    // Hooks =====================
    const navigate = useNavigate();
    const [uploads, setUploads] = useState(null);
    const api = useProtectedEndpoint();

    // Effects =====================
    useEffect(() => {
        const endpoint = endpoints.fileManagerURL();
        api.get(endpoint)
            .then((response) => {
                setUploads(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Handlers =====================
    const handleCalgenClick = (e) => navigate("/upload");

    return (
        <div>
            {uploads ? (
                <>
                    <button type="button" onClick={handleCalgenClick}>
                        calgen
                    </button>
                    {console.log(uploads)}
                    <ul>
                        <li> HELLO </li>
                        {uploads.map((upload, index) => 

                            <li key={index}>
                                {upload.name}
                            </li>
                        )}
                    </ul>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}

export default Dashboard;
