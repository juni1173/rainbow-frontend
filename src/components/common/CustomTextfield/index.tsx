"use client";
import React, { forwardRef } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import styles from "./index.module.scss";
import { CustomTextFieldProps } from "@/src/Types/CustomTextFieldProps";

const CustomTextField: React.FC<CustomTextFieldProps> = forwardRef(
  (
    {
      label,
      variant = "outlined",
      helperText = "",
      placeholder = "Write Something ",
      error = false,
      startIcon = null,
      endIcon = null,
      onStartIconClick,
      onEndIconClick,
      height,
      width,
      background,
      fixedEndText,
      type = "text",
      acceptedFileFormats,
      readOnly = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <Box sx={{ width: "100%", marginTop: "-4px" }}>
        <Typography variant="subtitle1" sx={{ marginBottom: "6px" }}>
          {label}
        </Typography>
        <TextField
          type={type}
          variant={variant}
          error={error}
          helperText={helperText}
          inputRef={ref}
          placeholder={placeholder}
          InputProps={{
            readOnly: readOnly,
            startAdornment: startIcon ? (
              <InputAdornment position="start">
                <span onClick={onStartIconClick} className={styles.starIcon}>
                  {startIcon}
                </span>
              </InputAdornment>
            ) : null,
            endAdornment:
              endIcon || fixedEndText ? (
                <InputAdornment position="end">
                  {endIcon && (
                    <span onClick={onEndIconClick} className={styles.icon}>
                      {endIcon}
                    </span>
                  )}
                  {fixedEndText && (
                    <Typography
                      variant="subtitle1"
                      fontWeight={400}
                      color="#101928"
                      sx={{
                        marginLeft: endIcon ? "8px" : "0",
                      }}
                    >
                      {fixedEndText}
                    </Typography>
                  )}
                </InputAdornment>
              ) : null,
          }}
          inputProps={{
            accept: type === "file" ? acceptedFileFormats : undefined,
            sx: {
              "&::placeholder": {
                color: "#667185",
                fontSize: "14px",
                fontWeight: 500,
              },
            },
          }}
          sx={{
            borderRadius: "6px",
            width: width || "100%",
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "1.4375em",
              color: "#344054",
              borderRadius: "6px",
              fontFamily: "Mulish, sans-serif",
              // padding: "8px -8px",
              height: height || "47px",
              width: width || "100%",
              background: background || "transparent",
              "& fieldset": {
                borderColor: "1px solid #D0D5DD",
                borderRadius: "6px",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(0, 193, 212, 1)",
              },
            },
            "& .MuiOutlinedInput-input": {
  fontSize: "12px !important" ,
  fontWeight: "400 !important",
  color: "#344054",
  lineHeight: "1.4375em",
  fontFamily: "Mulish, sans-serif",
},

            "& .MuiFormHelperText-root": {
              color: error ? "#D32F2F" : "#667185",
              fontSize: "12px",
              marginTop: "4px",
            },
          }}
          {...rest}
        />
      </Box>
    );
  },
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
