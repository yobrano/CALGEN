import React, { useState, useEffect } from "react";
import { TextField, Typography, FormGroup, Button } from "@mui/material";

import { useBackdropContext } from "../BackdropProvider";

export default function AssignmentFieldForm() {
    // Hooks ====================
    const {
        editRow,
        listEditMode,
        assignFields,
        createAssignmentField,
        editAssignmentField,
        deleteAssignmentField,
    } = useBackdropContext();

    const [assignPair, setAssignPair] = useState({ field: "", value: "" });
    // Effects ================
    useEffect(() => {
        if (editRow.assignField !== null) {
            let temp = assignFields.at(editRow.assignField);
            setAssignPair(temp);
        }
    }, [editRow]);

    // Handlers ================
    const handleChange = (input) => (event) => {
        if (input === "field") {
            setAssignPair({ ...assignPair, field: event.target.value });
        } else if (input === "value") {
            setAssignPair({ ...assignPair, value: event.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editRow.assignField === null) {
            // Create mode
            createAssignmentField(assignPair);
        } else {
            // Edit mode
            editAssignmentField(editRow.assignField, assignPair);
            listEditMode({ assignField: null });
        }
        setAssignPair({ field: "", value: "" });
    };
    const handleEmptyForm = () => {
        return assignPair.field === "" || assignPair.value === "";
    };
    return (
        <FormGroup>
            <Typography variant="h6"> Assign Fields </Typography>

            <TextField
                value={assignPair.field}
                onChange={handleChange("field")}
                label="Target Field"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
            />

            <TextField
                value={assignPair.value}
                onChange={handleChange("value")}
                label="Assign Value"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
            />

            <Button
                variant="text"
                onClick={handleSubmit}
                disabled={handleEmptyForm()}
            >
                {editRow.assignField === null ? "Add" : "Edit"}
            </Button>
        </FormGroup>
    );
}
