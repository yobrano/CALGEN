import React, { useState } from "react";
import {
    TextField,
    Box,
    Divider,
    Typography,
    FormGroup,
    FormControlLabel,
    Switch,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Button,
    Grid,
    TableBody,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

function KeysForm() {
    const [expandedAccordion, setExpandedAccordion] = useState(false);

    const handleAccordionExpand = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : false);
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <KeyPropertiesForm />
                    <AddFilterFieldForm />
                    <AddAssignmentFieldForm />
                </Grid>

                <Grid item>
                    <Divider orientation="vertical" sx={{ mr: 1, ml: 1 }} />
                </Grid>

                <Grid item xs={6}>
                    <FilterFieldAccordion
                        expandedAccordion={expandedAccordion}
                        handleAccordionExpand={handleAccordionExpand}
                    />

                    <AssingmentFieldAccordion
                        expandedAccordion={expandedAccordion}
                        handleAccordionExpand={handleAccordionExpand}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default KeysForm;

const FilterFieldAccordion = ({ expandedAccordion, handleAccordionExpand }) => {
    return (
        <Accordion
            sx={{ width: "38vw" }}
            expanded={expandedAccordion === "filterFields"}
            onChange={handleAccordionExpand("filterFields")}
            elevation={0}
            disableGutters
        >
            <AccordionSummary
                sx={{ background: "#eeeeee" }}
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>Filter Fields</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Field</TableCell>
                            <TableCell align="left">value</TableCell>
                            <TableCell align="left">Aciton</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>Hello There This is a</TableCell>
                            <TableCell>Hello There This is a</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon size="small" />
                                </IconButton>
                                <IconButton color={"error"}>
                                    <DeleteIcon size="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    );
};

const AssingmentFieldAccordion = ({
    expandedAccordion,
    handleAccordionExpand,
}) => {
    return (
        <Accordion
            sx={{ width: "38vw" }}
            expanded={expandedAccordion === "assignFields"}
            onChange={handleAccordionExpand("assignFields")}
            elevation={0}
            disableGutters
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ background: "#eeeeee" }}
            >
                <Typography>Assigned Fields</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Field</TableCell>
                            <TableCell align="left">value</TableCell>
                            <TableCell align="left">Aciton</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>Hello There This is a</TableCell>
                            <TableCell>Hello There This is a</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon size="small" />
                                </IconButton>
                                <IconButton color={"error"}>
                                    <DeleteIcon size="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    );
};

const AddFilterFieldForm = () => {
    return (
        <FormGroup>
            <Typography variant="h6"> Filter Fields </Typography>
            <TextField
                label="Filter Fields"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                required
            />

            <TextField
                label="Filter Value"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                required
            />
            <Button vairant="contained"> Add </Button>
        </FormGroup>
    );
};

const AddAssignmentFieldForm = () => {
    return (
        <FormGroup>
            <Typography variant="h6"> Assign Fields </Typography>

            <TextField
                label="Target Field"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                required
            />

            <TextField
                label="Assign Value"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                required
            />

            <Button vairant="contained"> Add </Button>
        </FormGroup>
    );
};

const KeyPropertiesForm = () => {
    return (
        <FormGroup sx={{ mb: 1 }}>
            <Typography variant="h6"> Keys Properties</Typography>
            <FormControlLabel label="Is Primary Key" control={<Switch />} />
            <TextField
                label="Foreign Table"
                variant="standard"
                sx={{ mr: 1, mb: 1.5 }}
                required
            />
        </FormGroup>
    );
};
