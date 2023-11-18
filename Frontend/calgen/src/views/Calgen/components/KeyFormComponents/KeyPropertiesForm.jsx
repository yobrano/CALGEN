import React, { useState, useEffect } from "react";
import {
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Switch,
} from "@mui/material";

import { useBackdropContext } from "../BackdropProvider";

export default function KeyPropertiesForm({}) {
    const {
        isPrimaryKey,
        foreignKeyTable,
        tooglePrimayKey,
        handleForeignKeyTable,
    } = useBackdropContext();

    const handleFKOnChange = (event) => {
        handleForeignKeyTable(event.target.value);
    };

    return (
        <FormGroup sx={{ mb: 1 }}>
            <Typography variant="h6"> Keys Properties</Typography>
            <FormControlLabel
                label="Is Primary Key"
                onChange={(event) => {
                    tooglePrimayKey();
                }}
                value={isPrimaryKey}
                control={<Switch />}
            />
            <TextField
                value={foreignKeyTable}
                onChange={handleFKOnChange}
                label="Foreign Table"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
            />
        </FormGroup>
    );
}
