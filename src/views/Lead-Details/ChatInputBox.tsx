"use client";
import React, { useState } from "react";
import { Box, TextField, Stack } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import TaskIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";
import CustomButton from "@/src/components/common/CustomButton";
import { AssignTask, Mark, SmallPhone } from "@/src/assests/icons";
import CallModal from "./CallModal";

const ChatInputBox = ({ leadId }: any) => {
  const [message, setMessage] = useState("");
  const [isCallOpen, setIsCallOpen] = useState(false);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "12px",
        marginTop: "55px",
        padding: 2,
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        border: "1px solid #DFE1E7",
      }}
    >
      <TextField
        multiline
        rows={5}
        placeholder="Type your message..."
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: 400,
            color: "#818898",
            padding: "16px",
            border: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />

      <Box
        mt={2}
        display="flex"
        alignItems="center"
        gap={2}
        width="100%"
        justifyContent="space-between"
      >
        <Box display="flex" gap={2}>
          <CustomButton
            variant="outlined"
            startIcon={<SmallPhone />}
            fontWeight="600"
            onClick={() => setIsCallOpen(true)}
          >
            Call via Twilio
          </CustomButton>

          <CustomButton
            variant="outlined"
            startIcon={<AssignTask />}
            fontWeight="600"
          >
            Assign Task
          </CustomButton>

          <CustomButton
            variant="outlined"
            startIcon={<Mark />}
            fontWeight="600"
          >
            Mark as Resolved
          </CustomButton>
        </Box>

        <CustomButton
          variant="contained"
          startIcon={<SendIcon />}
          disabled={message.trim() === ""}
          fontWeight="600"
          onClick={() => {
            setMessage("");
          }}
        >
          Send
        </CustomButton>
      </Box>
      <CallModal
        open={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        leadId={leadId}
        // phone={phone}
      />
    </Box>
  );
};

export default ChatInputBox;
// Twiliyo phone number +12187893464
