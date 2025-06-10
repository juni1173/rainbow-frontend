import React from "react";
import { Box, Typography } from "@mui/material";
import DisplayField from "./DisplayField";

const SettingsPanel = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // alert("Copied to clipboard!");
  };

  return (
    <Box p={4} bgcolor="#fff" borderRadius={2} boxShadow={1}>
      <Typography variant="h2" fontSize={24} fontWeight={600} mb={3}>
        Twilio Integration Settings
      </Typography>

      <DisplayField
        label="Twilio Phone Number"
        value="+123 456 0000"
        showCopyIcon={true}
        onCopy={() => handleCopy("+123 456 0000")}
      />
      <DisplayField
        label="Account SID"
        value="Aadsadihdujasfh19283cq1m2189"
        showCopyIcon={true}
        onCopy={() => handleCopy("Aadsadihdujasfh19283cq1m2189")}
      />
      <DisplayField
        label="Auth Token"
        value="•••••••••••••••••••••••••••"
        showCopyIcon={true}
        onCopy={() => handleCopy("your_real_token_here")}
      />
    </Box>
  );
};

export default SettingsPanel;
