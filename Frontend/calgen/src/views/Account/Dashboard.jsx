import React, { useEffect, useState } from "react";
import { endpoints } from "../../utils/endpoints";
import { useProtectedEndpoint } from "../../utils/useProtectedEndpoint";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Backdrop } from "@mui/material";
import Logout from "./Logout";
import Upload from "../Calgen/Upload";
function Dashboard() {
    // Hooks =====================
    const navigate = useNavigate();
    const [uploads, setUploads] = useState(null);
    const [open, setOpen] = useState(false)
    const api = useProtectedEndpoint();

    // Effects =====================
    useEffect(() => {
        // get table data
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
    const handleCalgenClick = (event) => navigate("/upload");
    const handleLogoutClick = (event) => setOpen((prev)=>!prev)
    return (
        <div>
            {uploads ? (
                <>
                    <Backdrop
                        open={open}
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        >
                        <Logout handleCancel={handleLogoutClick}  />
                    </Backdrop>

                    <button onClick={handleLogoutClick} >Logout</button>
                    
                    <ul>
                        {uploads.map((upload, index) => 

                            <li key={index}>
                                <Link to = "/table" state= {{code: upload.code}}>
                                    {upload.name}
                                </Link>
                            </li>
                        )}
                    </ul>

                    <Upload/>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}

export default Dashboard;
