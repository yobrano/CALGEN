import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Button, Container, Backdrop, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    Build as BuildIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Upload as UploadIcon,
} from "@mui/icons-material";

import { useProtectedEndpoint } from "../../utils/useProtectedEndpoint";
import { endpoints } from "../../utils/endpoints";
import { useSourceTableApi } from "../../context/SourceTableApiContext";
import { useSourceTable } from "../../context/SourceTableContext";

import TabContainter from "./components/TabContainter";

export default function SourceTable() {
    // Hooks =========================
    const loc = useLocation();
    const api = useProtectedEndpoint();
    const {getTable} = useSourceTableApi()
    const {table} =  useSourceTable()
    const [selectedRows, setSelectedRows] = useState([]);
    const [tableContents, setTableContents] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    // Effects =========================
    useEffect(() => {
        const code = loc.state.code;
        getTable(code)
        
    }, []);

    // Handlers =========================
    const handleCloseBackdrop = () => setOpenBackdrop(false);
    const handleRowDoubleClick = (params) => {
        setOpenBackdrop(true);
        console.log(params);
    };
    const handleSelection = (ids) => {
        setSelectedRows(ids);
    };
    const handleDeleteRows = () => console.log(selectedRows);

    return (
        <Container>
            {table ? (
                <>
                    <Backdrop
                        sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={openBackdrop}
                    >
                        <TabContainter closeBackdrop={handleCloseBackdrop} />
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
                            <SideButtons />
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
    const paginationSize = 10;

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

const SideButtons = () => {
    console.log("U F*cked.");
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
                <Button variant="contained" startIcon={<BuildIcon />}>
                    Build
                </Button>
                <Button variant="contained" startIcon={<UploadIcon />}>
                    Upload
                </Button>
                <Button
                    variant="contained"
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
        field: "Retained Fields",
        headerName: "Retained Fields",
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
