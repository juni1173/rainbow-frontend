"use client";
import React, { useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

export type CustomTextFieldProps = TextFieldProps & {
  helperText?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onStartIconClick?: MouseEventHandler<HTMLSpanElement>;
  onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
  width?: string | number;
  height?: string;
  background?: string;
  fixedEndText?: string;
  searchQuery?: string;
  setSearchQuery?: any;
};

const CustomSearchField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  helperText = "",
  required = false,
  placeholder = "Search...",
  startIcon = null,
  endIcon = null,
  onStartIconClick,
  onEndIconClick,
  width = "220px",
  setSearchQuery,
  height,
  ...rest
}) => {
  const [, setError] = useState(false);
  const [, setHelperText] = useState<string | undefined>("");
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (required && !value) {
      setError(true);
      setHelperText("This field is required");
    } else {
      setError(false);
      setHelperText(undefined);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Box>
        <Typography variant="subtitle1" sx={{ marginBottom: "6px" }}>
          {" "}
          {label}
        </Typography>
        <TextField
          variant={variant}
          required={required}
          helperText={helperText}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                <span onClick={onStartIconClick} style={{ marginTop: "6px" }}>
                  {startIcon}
                </span>
              </InputAdornment>
            ) : null,
            endAdornment: endIcon ? (
              <InputAdornment position="end">
                <span onClick={onEndIconClick}>{endIcon}</span>
              </InputAdornment>
            ) : null,
          }}
          inputProps={{
            sx: {
              "&::placeholder": {
                fontSize: "14px",
                fontWeight: 400,
                color: "#667185",
              },
            },
          }}
          sx={{
            borderRadius: "6px",
            width: width,
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "1.4375em",
              color: "#667185",
              borderRadius: "10px",
              fontFamily: "Mulish, sans-serif",
              padding: "8px 12px",
              height: height || "47px",
              background:"#F6F8FA",
              "& fieldset": {
                // borderColor: "1px solid #D0D5DD",
                border:"none",
                outline:"none"
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
            },
          }}
          placeholder={placeholder}
          {...rest}
        />
      </Box>
    </>
  );
};

export default CustomSearchField;
