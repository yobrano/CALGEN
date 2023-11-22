import { Button } from "@mui/material";
import React from "react";
import { useBackdropContext } from "./BackdropProvider";

function FieldForm() {
    const {applyRecordChanges} = useBackdropContext()

    const handleApplyClick = (event) =>{
        applyRecordChanges()
    }   
    
    return (
        <>
            <Button variant="contained" onClick={handleApplyClick}>
                Apply
            </Button>
        </>
    );
}

export default FieldForm;

const emptyField = {
    Enabled: "Yes",
    id: null,
    "Field Name": "",
    Caption: "",
    "Data Type": "Integer",
    "Primary Key": "",
    "Foreign Key": "",
    "Retained Fields": false,
    Length: null,
    Description: "",
    "Field Class": "Normal",
    "Option String": "",
};
