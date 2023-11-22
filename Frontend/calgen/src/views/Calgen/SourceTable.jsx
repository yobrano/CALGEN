import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, Button, Container, Backdrop, Grid, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Build as BuildIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Home,
    Upload as UploadIcon,
} from "@mui/icons-material";

import { useProtectedEndpoint } from "../../utils/useProtectedEndpoint";
import { useSourceTableApi } from "../../context/SourceTableApiContext";
import { useSourceTable } from "../../context/SourceTableContext";

import TabContainter from "./components/TabContainter";
import BackdropProvider from "./components/BackdropProvider";

export default function SourceTable() {
    // Hooks =========================
    const navigate = useNavigate()
    const location = useLocation();

    const api = useProtectedEndpoint();
    const { getTable, updateTable } = useSourceTableApi();
    const { table } = useSourceTable();

    const [openTabNumber, setOpenTabNumber] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    // Effects =========================
    useEffect(() => {
        const code = location.state.code;
        const action = location.state.action
        getTable(code);

        switch(action){
            case "form": 
                setOpenTabNumber(0)
                setOpenBackdrop(true)
                break;
            case "keys": 
                setOpenTabNumber(1)
                setOpenBackdrop(true)
                break;
            case "build": 
                setOpenTabNumber(2)
                setOpenBackdrop(true)
                break;
            default: 
                setOpenTabNumber(0)
                setOpenBackdrop(false)
                break;
        }

    }, []);

    // Handlers =========================
    const handleHomeClick = (event) =>{
        navigate("/dashboard")
    }
    
    const handleBuild = (event) => {
        setOpenTabNumber(2);
        setOpenBackdrop(true);
    };
    const handleUpload = (event) => {
        updateTable()
    };
    const handleDropTable = (event) => {};

    const handleCloseBackdrop = (event) => {
        setOpenTabNumber(0);
        setOpenBackdrop(false);

        let temp = [...selectedRows]
        temp.pop()
        setSelectedRows(temp)
    };

    const handleRowDoubleClick = (params) => {
        setOpenTabNumber(1);
        setOpenBackdrop(true);
        setSelectedRows([...selectedRows, params.id])
    };
    const handleSelection = (ids) => {
        console.log(ids)
        setSelectedRows(ids);
    };
    
    const handleDeleteRows = (event) => console.log(selectedRows);

    return (
        <Container>
            <Box sx={{display: "flex", flexDirection:"row-reverse"}} >
            <IconButton color="primary" onClick={(event)=>handleHomeClick(event)} >
                <Home/>
            </IconButton>
            </Box>
            {table ? (
                <>
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={openBackdrop}
                    >
                        <BackdropProvider
                            closeBackdrop={handleCloseBackdrop}
                            openTabNumber={openTabNumber}
                            selectedRows={selectedRows}
                        >
                            <TabContainter />
                        </BackdropProvider>
                    </Backdrop>

                    <Grid spacing={2} container>
                        <Grid sm={12} md={9} item>
                            <DataTable
                                handleRowDoubleClick={handleRowDoubleClick}
                                handleDeleteRows={handleDeleteRows}
                                tableContents={table}
                                selectedRows={selectedRows}
                                handleSelection={handleSelection}
                            />
                        </Grid>
                        <Grid xs={3} item>
                            <SideButtons
                                {...{
                                    handleBuild,
                                    handleUpload,
                                    handleDropTable,
                                }}
                            />
                        </Grid>
                    </Grid>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
}

const DataTable = ({
    handleRowDoubleClick,
    handleDeleteRows,
    tableContents,
    selectedRows,
    handleSelection,
}) => {
    const paginationSize = 15;

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    startIcon={<EditIcon />}
                    onClick={handleRowDoubleClick}
                    disabled={selectedRows.length !== 1}
                >
                    Edit
                </Button>
                <Button
                    endIcon={<DeleteIcon />}
                    onClick={handleDeleteRows}
                    disabled={selectedRows.length === 0}
                    color="error"
                >
                    Delete
                </Button>
            </Box>
            <Box sx={{ height: 600 }}>
                <DataGrid
                    rows={tableContents}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: paginationSize,
                            },
                        },
                    }}
                    pageSizeOptions={[paginationSize]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    onRowSelectionModelChange={(ids) => handleSelection(ids)}
                />
            </Box>
        </>
    );
};

const SideButtons = ({ handleBuild, handleUpload, handleDropTable }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",

                    height: "10rem",
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleBuild}
                    startIcon={<BuildIcon />}
                >
                    Build
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUpload}
                    startIcon={<UploadIcon />}
                >
                    Upload
                </Button>
                <Button
                    variant="contained"
                    onClick={handleDropTable}
                    color="error"
                    startIcon={<DeleteIcon />}
                >
                    Drop
                </Button>
            </Box>
        </Box>
    );
};

const columns = [
    { field: "id", headerName: "ID", width: 10 },
    // {field:"Enabled", headerName: "Enabled",  width: 110},
    {
        field: "Field Name",
        headerName: "Field Name",
        width: 150,
    },
    // {field:"Caption", headerName: "Caption",  width: 110},
    // { field: "Data Type", headerName: "Data Type",  width: 110 },
    {
        field: "Primary Key",
        headerName: "Primary Key",
        width: 110,
    },
    {
        field: "Foreign Key",
        headerName: "Foreign Key",
        width: 110,
    },
    {
        field: "Retained Field",
        headerName: "Retained Field",
        width: 110,
    },
    // {field:"Length", headerName: "Length",  width: 110},
    // {field:"Description", headerName: "Description",  width: 110},
    {
        field: "Field Class",
        headerName: "Field Class",
        width: 110,
    },
    {
        field: "Option String",
        headerName: "Option String",
        width: 150,
    },
];
