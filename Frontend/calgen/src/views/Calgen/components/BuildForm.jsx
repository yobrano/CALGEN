import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { useTemplatesApi } from "../../../context/TemplatesApiContext";
import { useNavigate } from "react-router-dom";
import { useBackdropContext } from "./BackdropProvider";

export default function BuildForm() {
    const { closeBackdrop } = useBackdropContext();

    const { build, config, changeConfig } = useTemplatesApi();
    const navigate = useNavigate();
    useBackdropContext();
    const handleFormChange = (field) => (event) => {
        const temp = { ...config };
        temp[field] = event.target.value;
        changeConfig(temp);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        build(config);
        closeBackdrop();
    };
    return (
        <Box>
            <FormControl>
                <TextField
                    value={config.tableName}
                    onChange={handleFormChange("tableName")}
                    label="Table Name"
                    variant="standard"
                />
                <Typography sx={{ mt: 3 }}>Input Format</Typography>
                <RadioGroup
                    name="inputFormat"
                    defaultValue={"single"}
                    value={config.inputFormat}
                    onChange={handleFormChange("inputFormat")}
                >
                    <FormControlLabel
                        value="single"
                        control={<Radio />}
                        label="Single"
                    />
                    <FormControlLabel
                        value="array"
                        control={<Radio />}
                        label="Array"
                    />
                </RadioGroup>
                <Button onClick={handleSubmit}>Build</Button>
            </FormControl>
        </Box>
    );
}
