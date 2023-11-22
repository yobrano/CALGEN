import React, { useContext, useEffect, useState } from "react";
import {
    Paper,
    Box,
    Tabs,
    Tab,
    Typography,
    IconButton,
    Divider,
} from "@mui/material";

import {
    Close as CloseIcon,
    Edit as EditIcon,
    Key as KeyIcon,
    MoreHoriz as MoreHorizontalIcon,
} from "@mui/icons-material";

import FieldForm from "./FieldForm";
import KeysForm from "./KeysForm";
import BuildForm from "./BuildForm";
import { useBackdropContext } from "./BackdropProvider";


export default function TabContainter() {
    const { closeBackdrop, openTabNumber } = useBackdropContext()
    const [activeTab, setActiveTab] = useState(openTabNumber);

    const handleTabSwitch = (event, selectedTab) => {
        setActiveTab(selectedTab);

    };

    useEffect(()=>{
        const handleEscape = (event)=> {
            if(event.keyCode === 27){
                closeBackdrop()
            }
        }
        document.addEventListener("keydown", handleEscape )
        return ()=> {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    useEffect(()=>{
        setActiveTab(openTabNumber)
    }, [openTabNumber])

    return (
        <Paper
            sx={{
                width: 970,
                height: 650,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabSwitch}
                    aria-label="basic tabs example"
                >
                    {TabItems()}
                </Tabs>
                <IconButton onClick={() => closeBackdrop()} sx={{ mr: 2 }} color= "error" >
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ display: "flex" }}>
                <Divider />
                <TabPanel index={0} value={activeTab}>
                    <FieldForm/>
                </TabPanel>
                <TabPanel index={1} value={activeTab}>
                    <KeysForm/>
                </TabPanel>
                <TabPanel index={2} value={activeTab}>
                    <BuildForm/>
                </TabPanel>
            </Box>
        </Paper>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const TabItems = () => {
    const tabItems = [
        {
            label: "Edit",
            action: () => console.log("editing"),
        },
        {
            label: "Keys",
            action: () => console.log("Keys"),
        },
        {
            label: "Build",
            action: () => console.log("Build"),
        },
    ];

    const a11yProps = (index) => ({
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    });

    return tabItems.map((item, index) => (
        <Tab
            key={index}
            label={item.label}
            aria-label={item.label}
            sx={{ p: 0 }}
            {...a11yProps(index)}
        />
    ));
};

