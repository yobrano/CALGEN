import React from "react";
import { useAuthenticate } from "../../context/AuthenticateProvider";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography, Box, Container } from "@mui/material";

function Logout({ handleCancel }) {
    const { logout } = useAuthenticate();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        logout();
        navigate("/");
    };

    return (
        <>
            <Paper
                sx={{
                    p: 3,
                    height: 150,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h6">
                        You are about to Logout.
                    </Typography>
                    <Typography variant="caption">
                        Are you sure you want to proceed?
                    </Typography>
                    <Typography style={{ fontSize: "1.8rem" }}> 😟 </Typography>
                </Box>
					
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        onClick={handleLogout}
                        variant="contained"
                        size="small"
                    >
                        logout
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="contained"
                        color="error"
                        size="small"
                    >
                        cancel
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default Logout;
