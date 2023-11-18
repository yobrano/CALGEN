import {
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
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

import { useBackdropContext } from "../BackdropProvider";

export default function FilterFieldAccordion({
    expandedAccordion,
    handleAccordionExpand,
}) {
    // Hooks =================
    const { filterFields, editRow, deleteFilterField, listEditMode } =
        useBackdropContext();

    // Handlers =================
    const handleEditClick = (event, index) => {
        listEditMode({ filterField: index });
    };

    const handleDeleteClick = (event, index) => {
        deleteFilterField(index);
        console.log("delete");
    };
    console.log(filterFields.length)
    const handleRowEditStyle = (index) => ({
        borderRadius: index === editRow.filterField ? "5px" : null,
        boxShadow:
            index === editRow.filterField ? "inset 0 0 10px #aaaaaa" : null,
    });


    return (
        <Accordion
            sx={{ width: "38vw", overflow: "hidden" }}
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
                {filterFields.length ? (
                    <TableContainer sx={{ maxHeight: "58vh" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Field</TableCell>
                                    <TableCell align="left">value</TableCell>
                                    <TableCell align="left">Aciton</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody
                                sx={{
                                    overflowX: "visible ",
                                    overflowY: "auto",
                                }}
                            >
                                {filterFields.map((item, index) => (
                                 <TableRow
                                        key={index}
                                        sx={{ ...handleRowEditStyle(index) }}
                                    >
                                        <TableCell>{item.field}</TableCell>
                                        <TableCell>{item.value}</TableCell>
                                        <TableCell>
                                            {index !== editRow.filterField && (
                                                <>
                                                    <IconButton
                                                        color={"primary"}
                                                        onClick={(event) =>
                                                            handleEditClick(
                                                                event,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <EditIcon size="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        color={"error"}
                                                        sx={{ ml: 5 }}
                                                        onClick={(event) =>
                                                            handleDeleteClick(
                                                                event,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon size="small" />
                                                    </IconButton>
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography >Nothing to see here....</Typography >
                )}
            </AccordionDetails>
        </Accordion>
    );
}
