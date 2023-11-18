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

export default function AssingmentFieldAccordion({
    expandedAccordion,
    handleAccordionExpand,
}) {
    // Hooks =================
    const { assignFields, editRow, deleteAssignmentField, listEditMode } =
        useBackdropContext();

    // Handlers =================
    const handleEditClick = (event, index) => {
        listEditMode({ assignField: index });
    };

    const handleDeleteClick = (event, index) => {
        deleteAssignmentField(index);
    };

    const handleRowEditStyle = (index) => ({
        borderRadius: index === editRow.assignField ? "5px" : null,
        boxShadow:
            index === editRow.assignField ? "inset 0 0 10px #aaaaaa" : null,
    });

    return (
        <Accordion
            sx={{ width: "38vw", overflow: "hidden" }}
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
                {assignFields.length ? (
                    <TableContainer sx={{ maxHeight: "58vh" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Field</TableCell>
                                    <TableCell align="left">value</TableCell>
                                    <TableCell align="left">Aciton</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                            {assignFields.map((item, index) => (
                                 <TableRow
                                        key={index}
                                        sx={{ ...handleRowEditStyle(index) }}
                                    >
                                        <TableCell>{item.field}</TableCell>
                                        <TableCell>{item.value}</TableCell>
                                        <TableCell>
                                            {index !== editRow.assignField && (
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
                    <Typography > I can only work with what you provide... </Typography >
                )}
            </AccordionDetails>
        </Accordion>
    );
}
