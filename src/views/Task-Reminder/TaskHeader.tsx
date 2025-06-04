"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { viewButtons } from "./data";
import CustomButton from "@/components/common/CustomButton";
import { Add } from "@/assests/icons";

const TaskHeader = () => {
  const [activeButton, setActiveButton] = useState("list");

  return (
    <Box mb={4.2}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Typography variant="h1" color="#0D0D12">
          Task & Reminder
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Box
            sx={{
              display: "inline-flex",
              border: "1px solid #ccc",
              borderRadius: "12px",
              overflow: "hidden",
              padding: "4px",
              background: "#fff",
            }}
          >
            {viewButtons.map(({ id, icon }) => (
              <Box
                key={id}
                onClick={() => setActiveButton(id)}
                sx={{
                  cursor: "pointer",
                  padding: "10px 16px",
                  backgroundColor:
                    activeButton === id ? "#F4EDFF" : "transparent",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#C1C7D0",
                }}
              >
                {React.cloneElement(icon, {
                  backgroundColor: activeButton === id ? "#7A4DF5" : "#A0A0A0",
                  sx: {
                    fontSize: 24,
                    color: activeButton === id ? "#7A4DF5" : "#A0A0A0",
                  },
                })}
              </Box>
            ))}
          </Box>
          <CustomButton
            variant="contained"
            startIcon={<Add />}
            padding="15px"
            background="#6B39F4"
          >
            Create New Task
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskHeader;
