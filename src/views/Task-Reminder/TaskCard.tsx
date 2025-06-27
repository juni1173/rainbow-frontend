"use client";
import React from "react";
import { Box, Typography, Stack, Button, Checkbox } from "@mui/material";
import CustomButton from "@/src/components/common/CustomButton";
import { Bell, Details, Meeting, UrgentBlue } from "@/src/assests/icons";
import CheckCircleOutlineIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface TaskReminderCardProps {
  taskTitle: string;
  leadName: string;
  taskDescription: string;
  dueDate: string;
  dueLabel?: string;
  tagLabel?: string;
  tagColor?: string;
}

const TaskReminderCard: React.FC<TaskReminderCardProps> = ({
  taskTitle,
  leadName,
  taskDescription,
  dueDate,
  dueLabel,
  tagLabel,
  tagColor,
}) => {
  return (
    <Box
      sx={{
        // borderRadius: 2,
        // border: "1px solid #DFE1E7",
        p: 2,
        bgcolor: dueLabel ? "#FFEAEA" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // mb: 1.5,
        flexWrap: "wrap",
        borderBottom: "1px solid #DFE1E7",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flex={1}
        minWidth={300}
      >
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          sx={{
            color: "#A0A0A0",
            "&.Mui-checked": {
              color: "#007BFF",
            },
          }}
        />

        <Box sx={{ minWidth: 180 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ cursor: "pointer" }}
            noWrap
            mb={0.5}
          >
            {taskTitle}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mt={0.3}
            flexWrap="wrap"
          >
            <Details sx={{ fontSize: 16, color: "#787878" }} />
            <Typography variant="caption" color="#787878" mr={1} noWrap>
              {dueDate}
            </Typography>
            {dueLabel && (
              <Box
                sx={{
                  bgcolor: "#fff",
                  p: "6px 8px",
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#36394A",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Bell />
                {dueLabel}
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>

      <Box
        sx={{
          gap: 1,
          color: "#666",
          fontSize: 14,
          whiteSpace: "nowrap",
          userSelect: "none",
          minWidth: 250,
          flex: "1 1 auto",
          justifyContent: "center",
        }}
      >
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Typography variant="body2" color="#0D0D12" mb={0.5}>
            Lead:&nbsp;{leadName}
          </Typography>
          {tagLabel && (
            <Box
              sx={{
                bgcolor: tagColor || "#CEE5FF",
                p: "6px 8px",
                borderRadius: "4px",
                fontSize: 12,
                fontWeight: 400,
                color: "#0062FF",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <UrgentBlue />
              {tagLabel}
            </Box>
          )}
        </Box>
        <Box>
          <Typography color="#666D80" fontSize={16} fontWeight={400}>
            Tasks:&nbsp;{taskDescription}
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ minWidth: 180, justifyContent: "flex-end" }}
      >
        <CustomButton
          variant="outlined"
          sx={{
            border: "1px solid #36394A",
            borderRadius: "60px",
            color: "#36394A",
            fontWeight: "600",
          }}
        >
          Snooze
        </CustomButton>
        <CustomButton
          variant="outlined"
          startIcon={<Meeting />}
          customColor="#7A4DF5"
          sx={{
            borderRadius: "60px",
            border: "1px solid #7A4DF5",
            color: "#7A4DF5",
            fontWeight: "600",
          }}
        >
          Reschedule
        </CustomButton>
      </Stack>
    </Box>
  );
};

export default TaskReminderCard;
