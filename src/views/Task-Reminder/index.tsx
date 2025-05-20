import { Box } from '@mui/material'
import React from 'react'
import TaskReminderCard from './TaskReminderCard'

const TaskReminder = () => {
  return (
  <Box>
<TaskReminderCard
  taskTitle="Call Mrs. Smith"
  leadName="Smith Brown"
  taskDescription="Schedule call the leads"
  dueDate="Today - 04:00 PM"
  dueLabel="Due Soon"
  tagLabel="Highly Interested"
  tagColor="#90CAF9"
  onSnooze={() => alert("Snoozed")}
  onReschedule={() => alert("Reschedule clicked")}
/>

  </Box>
  )
}

export default TaskReminder