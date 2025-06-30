"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import { Ai } from "@/src/assests/icons";
import CustomButton from "@/src/components/common/CustomButton";
import { useGetSuggestionsQuery } from "@/src/redux/services/conversation/conversationApi";
import { useSendSmsMutation } from "@/src/redux/services/twilio/twilioApi";
import { toast } from "react-toastify";

const CallLogsSection = ({ lead_id }: any) => {
  const { data: SuggestionData, isLoading } = useGetSuggestionsQuery({
    lead_id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const originalMessage = useRef(message);
  const [sendSms] = useSendSmsMutation();

  useEffect(() => {
    if (SuggestionData?.suggestion?.content) {
      setMessage(SuggestionData.suggestion.content);
    }
  }, [SuggestionData]);

  const handleEditClick = () => {
    originalMessage.current = message;
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setMessage(originalMessage.current);
    setIsEditing(false);
  };

  const SendMessage = async () => {
    try {
      await sendSms({
        lead_id: lead_id,
        sms_content: message,
      }).unwrap();
      toast.success("Sugestion Sent Successfully!!");
    } catch (err) {
      console.error("SMS Failed:", err);
      toast.error("Failed to send Message. Try Again");
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid #D3C4FC",
        borderRadius: "12px",
        p: 2,
        backgroundColor: "#fff",
        marginTop: "32px",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={1} px={0.5}>
        <Ai />
        <Typography variant="body1" fontSize={16} color="#6B39F4">
          AI Draft & Suggestion Panel
        </Typography>
      </Stack>

      {!isEditing ? (
        <Box
          sx={{
            backgroundColor: "#F3F2FF",
            borderRadius: "12px",
            p: 2,
            mb: 1.5,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#0D0D12",
            whiteSpace: "pre-wrap",
          }}
        >
          {!message ? (
            <Typography color="error">No Suggestion Found!</Typography>
          ) : (
            <Box>{message}</Box>
          )}
        </Box>
      ) : (
        <textarea
          style={{
            width: "100%",
            // maxWidth: 560,
            height: 100,
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            lineHeight: "20px",
            color: "#0D0D12",
            border: "1px solid #6B39F4",
            backgroundColor: "#F3F2FF",
            resize: "none",
            outline: "none",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      )}

      <Box display="flex" justifyContent="end" gap={1.5} mt={2}>
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
            onClick={SendMessage}
          >
            Send Now
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};

export default CallLogsSection;
