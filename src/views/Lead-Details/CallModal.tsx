"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { initTwilioDevice } from "@/src/utils/Twilio";
import {
  Call,
  CallEnd,
  CallMade,
  CallRounded,
  MaleOutlined,
  Person2Outlined,
  PersonOutline,
  VerifiedUserSharp,
} from "@mui/icons-material";
import { useCreateBotCallMutation } from "@/src/redux/services/twilio/twilioApi";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function CallModal({
  open,
  onClose,
  leadId,
}: {
  open: boolean;
  onClose: () => void;
  leadId?: any;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [conn, setConn] = useState<any>(null);
  const [callStarted, setCallStarted] = useState(false);

  const [createBotCall, { isLoading, isError, data }] =
    useCreateBotCallMutation();

  const handleBotCall = async () => {
    try {
      const res = await createBotCall({ lead_id: leadId }).unwrap();
      console.log("📞 Bot Call Started:", res);
      toast.success("Call initiated ✅");
      onClose();
    } catch (err) {
      console.error("❌ Bot Call Failed:", err);
    }
  };

  const handleCall = async () => {
    try {
      // if (!phone.startsWith("+")) {
      //   setError("Phone number must include country code (e.g., +1...)");
      //   return;
      // }

      setIsCalling(true);
      const device = await initTwilioDevice(leadId);
      const connection = await device.connect({
        params: {
          // To: phone,
          lead_id: leadId,
        },
      });

      // device.connect({
      //   To: leadId,
      //   // lead_id: leadId,
      //   // To: phone,
      // } as any);

      console.log("to number-----", phone);

      setConn(connection);
      setCallStarted(true);

      connection.on("accept", () => {
        console.log("✅ Call accepted");
      });

      connection.on("disconnect", () => {
        console.log("📞 Call ended");
        if (typeof window !== "undefined") {
          const event = new CustomEvent("twilio-call-rejected");
          window.dispatchEvent(event);
        }
        setIsCalling(false);
        setCallStarted(false);
        setConn(null);
      });

      connection.on("cancel", () => {
        console.log("❌ Call was canceled by the other user");
        if (typeof window !== "undefined") {
          const event = new CustomEvent("twilio-call-rejected");
          window.dispatchEvent(event);
        }
        setIsCalling(false);
        setCallStarted(false);
        setConn(null);
        onClose();
      });

      connection.on("reject", () => {
        console.log("🚫 Call was rejected");
        if (typeof window !== "undefined") {
          const event = new CustomEvent("twilio-call-rejected");
          window.dispatchEvent(event);
        }
        setIsCalling(false);
        setCallStarted(false);
        setConn(null);
        onClose();
      });

      connection.on("error", (err) => {
        console.error("📛 Twilio Call Error:", err);
        if (
          err.code === 31003 ||
          err.code === 31000 ||
          err.message.includes("busy")
        ) {
          console.log("🚫 Call was rejected or unreachable.");
          window.dispatchEvent(new Event("twilio-call-rejected"));
        }
        setError("Call error: " + err.message);
        setIsCalling(false);
        setCallStarted(false);
        setConn(null);
        onClose();
      });
    } catch (err) {
      console.error("Error starting call:", err);
      setError("Could not start call.");
      setIsCalling(false);
      setCallStarted(false);
    }
  };

  const handleEndCall = () => {
    if (conn) {
      conn.disconnect();
    }
    setIsCalling(false);
    setCallStarted(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      // onClose={onClose}
      //  open={open}
      onClose={(event, reason) => {
        if (
          callStarted &&
          (reason === "backdropClick" || reason === "escapeKeyDown")
        ) {
          return;
        }
        onClose();
      }}
      aria-labelledby="twilio-call-modal"
      aria-describedby="twilio-call-description"
    >
      <Box sx={style}>
        {callStarted ? (
          <Stack alignItems="center" spacing={2} mb={3}>
            <Typography variant="h6" mb={3}>
              Ringing {phone}...
              {/* {callConnected ? "Connected" : `Ringing ${phone}...`} */}
            </Typography>
            <Box>
              <PersonOutline sx={{ width: "120px", height: "120px" }} />
            </Box>
            <Stack direction="row" spacing={2} mt={5}>
              <Button
                variant="contained"
                color="error"
                onClick={handleEndCall}
                sx={{
                  backgroundColor: "red",
                  borderRadius: "50px",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
              >
                <CallEnd />
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography variant="h6" fontWeight={600} fontSize={22} mb={3}>
              Start a Twilio Call
            </Typography>
            <Stack spacing={4} mt={2}>
              {/* <CustomTextField
                label="Enter Phone Number"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={!!error}
                helperText={error}
                fullWidth
              /> */}
              <Box sx={{ display: "flex", justifyContent: "end", gap: "24px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCall}
                  disabled={isCalling}
                  startIcon={<CallRounded />}
                  sx={{
                    backgroundColor: "green",
                    borderRadius: "50px",
                    maxWidth: "120px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "24px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "green",
                    },
                    marginTop: "12px",
                  }}
                >
                  Self Call
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBotCall}
                  disabled={isCalling}
                  startIcon={<CallRounded />}
                  sx={{
                    borderRadius: "50px",
                    maxWidth: "160px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "24px auto 0 auto",

                    marginTop: "12px",
                  }}
                >
                  Call via Bot
                </Button>
              </Box>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
}
