"use client";
import React, { useState, useRef } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { Ai, Call, SmallPhone } from "@/assests/icons";
import CustomButton from "@/components/common/CustomButton";

const CallLogsSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(
    "Hi Danielle, would you be available for a call at 3:00 PM tomorrow?"
  );
  const [isEdited, setIsEdited] = useState(false);
  const [showCallInvitation, setShowCallInvitation] = useState(false);

  const originalMessage = useRef(message);

  const handleEditClick = () => {
    originalMessage.current = message;
    setIsEditing(true);
    setIsEdited(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsEdited(true);
  };

  const handleCancelClick = () => {
    setMessage(originalMessage.current);
    setIsEditing(false);
    setIsEdited(false);
  };

  const handleSendNowClick = () => {
    setShowCallInvitation(true);
    setIsEditing(false);
  };

  const handleAcceptSchedule = () => {
    alert("Schedule accepted!");
    setShowCallInvitation(false);
  };

  const handleDeclineSchedule = () => {
    setShowCallInvitation(false);
  };

  return (
    <Box
      sx={{
        border: "1px solid #D3C4FC",
        borderRadius: "12px",
        p: 2,
        maxWidth: "100%",
        backgroundColor: "#fff",
      }}
    >
      {!showCallInvitation && (
        <>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Call />
            <Typography
              variant="body1"
              fontWeight={600}
              color="#0D0D12"
              sx={{ userSelect: "none" }}
            >
              Call Logs
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ marginLeft: "auto" }}
            >
              11:34AM
            </Typography>
          </Stack>
          <Divider sx={{ marginX: "-17px", borderColor: "#DFE1E7" }} />
        </>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        mb={1}
        mt={showCallInvitation ? 0.1 : 3}
        sx={{ color: "#7E57C2", fontWeight: 600, cursor: "pointer" }}
        px={0.5}
      >
        {showCallInvitation ? <SmallPhone /> : <Ai />}
        <Typography
          variant="body1"
          fontSize={16}
          color={showCallInvitation ? "#0D0D12" : "#6B39F4"}
        >
          {showCallInvitation
            ? "Call Invitation"
            : "AI Draft & Suggestion Panel"}
        </Typography>
      </Stack>

      {!showCallInvitation ? (
        !isEditing ? (
          <Box
            sx={{
              backgroundColor: "#F3F2FF",
              borderRadius: "12px",
              p: 2,
              mb: 1.5,
              maxWidth: "100%",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#0D0D12",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Box>
        ) : (
          <textarea
            style={{
              width: "100%",
              maxWidth: 560,
              height: 100,
              borderRadius: 12,
              padding: 16,
              fontSize: 16,
              lineHeight: "20px",
              color: "#0D0D12",
              border: "1px solid #6B39F4",
              backgroundColor: "#F3F2FF",
              resize: "none",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )
      ) : (
        <Box
          sx={{
            backgroundColor: "#F3F2FF",
            borderRadius: "12px",
            p: 2,
            mb: 1.5,
            maxWidth: "100%",
            fontSize: "16px",
            lineHeight: "20px",
            color: "#0D0D12",
            whiteSpace: "pre-wrap",
          }}
        >
          MemoryArc wants schedule call with you tomorrow at 4:00 PM
        </Box>
      )}

      {!showCallInvitation ? (
        <Box
          display={"flex"}
          alignItems={"end"}
          gap={1.5}
          justifyContent={"end"}
          mt={2}
        >
          {/* {!isEditing && <CustomButton variant="outlined">Defer</CustomButton>} */}
          {!isEditing && (
            <CustomButton variant="outlined" onClick={handleEditClick}>
              Edit Message
            </CustomButton>
          )}
          {isEditing && (
            <>
              <CustomButton variant="outlined" onClick={handleCancelClick}>
                Cancel
              </CustomButton>
              <CustomButton variant="contained" onClick={handleSaveClick}>
                Save
              </CustomButton>
            </>
          )}
          {!isEditing && (
            <CustomButton
              variant="contained"
              background="#6B39F4"
              fontWeight="600px"
              onClick={handleSendNowClick}
            >
              Send Now
            </CustomButton>
          )}
        </Box>
      ) : (
        <Box
          display={"flex"}
          alignItems={"end"}
          gap={1.5}
          justifyContent={"end"}
          mt={2}
        >
          <CustomButton variant="outlined" onClick={handleDeclineSchedule}>
            Decline
          </CustomButton>
          <CustomButton variant="contained" onClick={handleAcceptSchedule}>
            Accept Schedule
          </CustomButton>
        </Box>
      )}
    </Box>
  );
};

export default CallLogsSection;
