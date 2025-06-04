"use client";
import { Box } from "@mui/material";
import React from "react";
import TaskReminderCard from "./TaskCard";
import TaskHeader from "./TaskHeader";
import { taskList } from "./data";

const TaskReminder = () => {
  return (
    <Box padding={"56px 48px 48px 48px"}>
      <TaskHeader />
      {taskList.map((task, index) => (
        <TaskReminderCard key={index} {...task} />
      ))}
    </Box>
  );
};

export default TaskReminder;
