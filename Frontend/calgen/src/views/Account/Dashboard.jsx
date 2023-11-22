import React, { useEffect, useState } from "react";
import { useProtectedEndpoint } from "../../utils/useProtectedEndpoint";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Backdrop,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Container,
    Box,
    ListItemSecondaryAction,
    IconButton,
    Tooltip,
} from "@mui/material";
import Logout from "./Logout";
import Upload from "../Calgen/Upload";
import { useSourceTableApi } from "../../context/SourceTableApiContext";
import { useSourceTable } from "../../context/SourceTableContext";
import { Build } from "@mui/icons-material";
function Dashboard() {
    // Hooks =====================
    const navigate = useNavigate();
    const [openLogout, setOpenLogout] = useState(false);

    const { getTableList } = useSourceTableApi();
    const { tableList } = useSourceTable();

    // Effects =====================
    useEffect(() => {
        getTableList();
    }, []);

    // Handlers =====================
    const handleCalgenClick = (event) => navigate("/upload");
    const handleLogoutClick = (event) => setOpenLogout((prev) => !prev);
    const handleTableClick = (event, code) => {
        navigate("/table", { state: { code } });
    };
    const handleBuildClick = (event, code) => {
        navigate("/table", { state: { code, action: "build" } });
    };
    return (
        <div>
            {tableList ? (
                <>
                    <Backdrop
                        open={openLogout}
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                    >
                        <Logout handleCancel={handleLogoutClick} />
                    </Backdrop>

                    <Box>
                        <Container>
                            <Typography variant="h4">
                                Uploaded Tables ...
                            </Typography>

                            {tableList.length ? (
                                <List>
                                    {tableList.map((item, index) => (
                                        <ListItem key={index} disableGutters>
                                            <ListItemButton
                                                onClick={(event) =>
                                                    handleTableClick(
                                                        event,
                                                        item.code
                                                    )
                                                }
                                            >
                                                <ListItemText>
                                                    <Typography>
                                                        {item.name}
                                                    </Typography>
                                                </ListItemText>

                                                <ListItemSecondaryAction>
                                                    <Tooltip
                                                        title="Build"
                                                        placement="left"
                                                    >
                                                        <IconButton
                                                            color="primary"
                                                            onClick={(event) =>
                                                                handleBuildClick(
                                                                    event,
                                                                    item.code
                                                                )
                                                            }
                                                        >
                                                            <Build size="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemSecondaryAction>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Container>
                                    <Typography>
                                        There are no items to display at the
                                        moment.
                                    </Typography>
                                </Container>
                            )}
                        </Container>
                    </Box>
                    <Box>
                        <Button
                            onClick={handleLogoutClick}
                            variant="contained"
                            color="warning"
                        >
                            Logout
                        </Button>
                        <Upload />
                    </Box>
                </>
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}

export default Dashboard;
