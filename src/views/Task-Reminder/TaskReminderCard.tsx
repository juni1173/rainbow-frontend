"use client";
import React from "react";
import { Box, Typography, Stack, Button, Checkbox } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface TaskReminderCardProps {
  taskTitle: string;
  leadName: string;
  taskDescription: string;
  dueDate: string;
  dueLabel?: string; // e.g., "Due Soon"
  tagLabel?: string; // e.g., "Highly Interested"
  tagColor?: string;
  onSnooze?: () => void;
  onReschedule?: () => void;
}

const TaskReminderCard: React.FC<TaskReminderCardProps> = ({
  taskTitle,
  leadName,
  taskDescription,
  dueDate,
  dueLabel,
  tagLabel,
  tagColor,
  onSnooze,
  onReschedule,
}) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #DFE1E7",
        p: 2,
        bgcolor: dueLabel ? "#FFEAEA" : "#fff", // light red if Due Soon
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1.5,
      }}
    >
      {/* Left side: checkbox + details */}
      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
        <Checkbox />
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ cursor: "pointer" }}
          >
            {taskTitle}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mt={0.3}>
            <CalendarMonthIcon sx={{ fontSize: 16, color: "#787878" }} />
            <Typography variant="caption" color="#787878" mr={1}>
              {dueDate}
            </Typography>
            {dueLabel && (
              <Box
                sx={{
                  bgcolor: "#D1D1D1",
                  px: 1,
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#444",
                }}
              >
                {dueLabel}
              </Box>
            )}
            {tagLabel && (
              <Box
                sx={{
                  bgcolor: tagColor || "#CEE5FF",
                  px: 1,
                  borderRadius: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#004FCA",
                }}
              >
                {tagLabel}
              </Box>
            )}
          </Stack>

          <Typography variant="body2" color="#666" mt={0.5}>
            Lead: {leadName} &nbsp;&nbsp; | &nbsp;&nbsp; Tasks: {taskDescription}
          </Typography>
        </Box>
      </Stack>

      {/* Right side: buttons */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          sx={{ borderRadius: 2, textTransform: "none", px: 2 }}
          onClick={onSnooze}
        >
          Snooze
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 2,
            borderColor: "#7A4DF5",
            color: "#7A4DF5",
          }}
          onClick={onReschedule}
        >
          Reschedule
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskReminderCard;
