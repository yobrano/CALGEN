import React, { useEffect, useState } from "react";
import {
    TextField,
    Typography,
    FormGroup,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";

import { useSourceTable } from "@src-context/SourceTableContext";
import { useBackdropContext } from "../BackdropProvider";
import { MoreHoriz } from "@mui/icons-material";

export default function FilterFieldForm() {
    // Hooks ====================
    const {
        editRow,
        listEditMode,
        filterFields,
        createFilterField,
        editFilterField,
    } = useBackdropContext();

    const [filterPair, setFilterPair] = useState({ field: "", value: "" });
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Effects ====================
    useEffect(() => {
        if (editRow.filterField !== null) {
            let temp = filterFields.at(editRow.filterField);
            console.log(temp, filterFields);
            setFilterPair(temp);
        }
    }, [editRow]);

    // Handlers ====================
    const handleChange = (input) => (event) => {
        if (input === "field") {
            setFilterPair({ ...filterPair, field: event.target.value });
        } else if (input === "value") {
            setFilterPair({ ...filterPair, value: event.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editRow.filterField === null) {
            // Create mode
            createFilterField(filterPair);
        } else {
            // Edit mode
            editFilterField(editRow.filterField, filterPair);
            listEditMode({ filterField: null });
        }
        setFilterPair({ field: "", value: "" });
        // saveRecordChanges(recordIdx, recordDetails)
    };

    const handleEmptyForm = () => {
        return filterPair.field === "" || filterPair.value === "";
    };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (clickeOption) => {
        console.log(clickeOption)
        setFilterPair({...filterPair, value:`*${clickeOption}`})
        setAnchorEl(null);
    };

    // components ============

    const Options = [
        "Enabled",
        "Field No.",
        "Field Name",
        "Caption",
        "Data Type",
        "Primary Key",
        "Foreign Key",
        "Retained Fields",
        "Length",
        "Description",
        "Field Class",
        "Option String",
        "Enabled",
        "Field No.",
        "Field Name",
        "Caption",
        "Data Type",
        "Primary Key",
        "Foreign Key",
        "Retained Fields",
        "Length",
        "Description",
        "Field Class",
        "Option String",
        "Enabled",
        "Field No.",
        "Field Name",
        "Caption",
        "Data Type",
        "Primary Key",
        "Foreign Key",
        "Retained Fields",
        "Length",
        "Description",
        "Field Class",
        "Option String",
    ].map((item, index) => (
        <MenuItem key={index} value={item} onClick={(e)=>handleClose(item)}>
            {item}
        </MenuItem>
    ));

    return (
        <FormGroup>
            <Typography variant="h6"> Filter Fields </Typography>
            <TextField
                value={filterPair.field}
                onChange={handleChange("field")}
                label="Filter Fields"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                
            />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <TextField
                    value={filterPair.value}
                    onChange={handleChange("value")}
                    label="Filter Value"
                    variant="standard"
                    sx={{ mr: 1, mb: 1.5, flex: 1 }}
                    helperText="Use the prefix * when referencing a field within this table."
                    
                />
                <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <MoreHoriz />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    {Options}
                </Menu>
            </Box>
            <Button
                variant="text"
                onClick={handleSubmit}
                disabled={handleEmptyForm()}
            >
                {editRow.filterField === null ? "Add" : "Edit"}
            </Button>
        </FormGroup>
    );
}
