import React, { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import { Copy } from "@/assests/icons";
import { Check } from "@mui/icons-material";

const DisplayField = ({ label, value, showCopyIcon = false, onCopy }: any) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      my={1}
      justifyContent={"space-between"}
    >
      <Box flex={1}>
        <Typography fontSize={14} fontWeight={500}>
          {label}
        </Typography>
      </Box>

      <Box flex={1} display="flex" alignItems="center" >
        <TextField
          value={value}
          fullWidth
          size="small"
          disabled
          variant="outlined"
          sx={{
            maxWidth: "510px",
          }}
        />
        {showCopyIcon && (
          <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
            {copied ? <Check fontSize="small" sx={{borderColor:"blue"}}/> : <Copy fontSize="small" />}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default DisplayField;
