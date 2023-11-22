import React, { useState } from "react";
import { Box, Button, Divider, Grid, Typography, Zoom } from "@mui/material";

import KeyPropertiesForm from "./KeyFormComponents/KeyPropertiesForm";
import FilterFieldForm from "./KeyFormComponents/FilterFieldForm";
import AssignmentFieldForm from "./KeyFormComponents/AssignmentFieldForm";
import FilterFieldAccordion from "./KeyFormComponents/FilterFieldAccordion";
import AssingmentFieldAccordion from "./KeyFormComponents/AssingmentFieldAccordion";
import { useBackdropContext } from "./BackdropProvider";

export default function KeysForm() {
    // Hooks ====================
    const [expandedAccordion, setExpandedAccordion] = useState(false);
    const { applyRecordChanges, foreignKeyTable } = useBackdropContext();

    // Handlers ====================
    const handleAccordionExpand = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    const handleApplyClick = (event) => {
        applyRecordChanges();
    };
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <KeyPropertiesForm />
                    {foreignKeyTable ? (
                        <Zoom in={Boolean(foreignKeyTable)}>
                            <div>
                                <FilterFieldForm />
                                <AssignmentFieldForm />
                            </div>
                        </Zoom>
                    ) : (
                        <Box sx={{ minWidth: "30vw" }}>
                            <Typography variant="caption">
                                Populate the foreign Key Table to edit the
                                section below.
                            </Typography>
                        </Box>
                    )}
                </Grid>

                <Grid item>
                    <Divider orientation="vertical" sx={{ mr: 1, ml: 1 }} />
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ height: "74vh" }}>
                            <FilterFieldAccordion
                                expandedAccordion={expandedAccordion}
                                handleAccordionExpand={handleAccordionExpand}
                            />

                            <AssingmentFieldAccordion
                                expandedAccordion={expandedAccordion}
                                handleAccordionExpand={handleAccordionExpand}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row-reverse",
                                width: "38vw",
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleApplyClick}
                            >
                                Apply
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
