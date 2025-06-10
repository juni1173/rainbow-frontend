"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Typography,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import styles from "./index.module.scss";
import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CustomSelectProps, OptionType } from "@/Types/SelectProps";
import { removeColorColon } from "@/utils/removeColon";

const colorHexRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/;

const variants = {
  black: {
    borderColor: "default",
    textColor: "#344054",
    placeholderColor: "#98A2B3",
    iconColor: "#344054",
  },
  blue: {
    borderColor: "#00C1D4",
    textColor: "#00C1D4",
    placeholderColor: "#00C1D4CC",
    iconColor: "#00C1D4",
  },
  white: {
    borderColor: "#FFFFFF",
    textColor: "#FFFFFF",
    placeholderColor: "#FFFFFF",
    iconColor: "#FFFFFF",
  },
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  variant = "black",
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  helperText = "",
  readOnly = false,
  minWidth = 230,
  labelId,
  id,
  multiple = false,
  placeholder = "Select a value",
  background,
  height,
  error,
  width,
}) => {
  const [isError, setIsError] = useState(false);
  const [, setIsFocused] = useState(false);

  useEffect(() => {
    if (required && (!value || (Array.isArray(value) && value.length === 0))) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [value, required]);

  const renderIcon = (isSelected: boolean) => {
    return isSelected ? <Favorite color="error" /> : <FavoriteBorder />;
  };

  const [, setErrorMessage] = useState<string | null>(null);

  const selectedVariant = variants[variant] || variants.black;

  const handleBlur = () => {
    setIsFocused(false);
    if (required && (!value || (Array.isArray(value) && value.length === 0))) {
      setIsError(true);
      setErrorMessage("This field is required");
    } else {
      setIsError(false);
      setErrorMessage(null);
    }
  };

  const renderColorDot = (label: string) => {
    // Check if label contains a color hex code
    const match = label.match(colorHexRegex);
    if (match) {
      const color = match[0]; // Extract the color code
      return (
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: color,
            marginRight: "8px",
          }}
        ></span>
      );
    }
    return null;
  };

  const renderValue = (selected: any) => {
    if (multiple && Array.isArray(selected)) {
      if (selected.length === 0) {
        return <span style={{ color: "#98A2B3" }}>{placeholder}</span>;
      }
      return selected
        .map((val) => {
          const option = options.find((o) => o.value === val);
          return option ? removeColorColon(option.label) : "";
        })
        .join(", ");
    } else if (typeof selected === "string" || typeof selected === "number") {
      const option = options.find((o) => o.value === selected);
      return option ? removeColorColon(option.label) : placeholder;
    } else {
      return <span style={{ color: "#98A2B3" }}>{placeholder}</span>;
    }
  };

  return (
    <FormControl
      sx={{
        minWidth,
        width: width || "100%",
        marginTop: "-4px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: error
            ? "rgba(212, 38, 32, 1)"
            : selectedVariant.borderColor,
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: error
            ? "rgba(212, 38, 32, 1)"
            : variant === "white"
              ? "#FFFFFF"
              : "rgba(0, 193, 212, 1)",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: error
            ? "rgba(212, 38, 32, 1)"
            : variant === "white"
              ? "#FFFFFF"
              : "rgba(0, 193, 212, 1)",
        },
      }}
      required={required}
      disabled={disabled}
      error={isError}
    >
      <Typography variant="subtitle1" sx={{ marginBottom: "6px" }}>
        {label}
      </Typography>

      <Select
        labelId={labelId}
        id={id}
        value={multiple ? (Array.isArray(value) ? value : []) : value || ""}
        onChange={onChange}
        onBlur={handleBlur}
        inputProps={{ readOnly }}
        multiple={multiple}
        displayEmpty
        IconComponent={() => (
          <DropDownIcon sx={{ color: selectedVariant.iconColor }} />
        )}
        renderValue={renderValue}
        MenuProps={{
          disablePortal: false,
          PaperProps: {
            style: {
              zIndex: 1300,
            },
          },
        }}
        sx={{
          width: "100%",
          height: height || "47px",
          fontSize: "14px",
          color: value
            ? selectedVariant.textColor
            : selectedVariant.placeholderColor,
          fontWeight: value ? "500" : "400",
          background: background || "transparent",
          ...(isError && {
            border: "1px solid rgba(212, 38, 32, 1)",
            borderRadius: "6px",
          }),
          "& .MuiSelect-select": {
            paddingRight: "32px",
            display: "flex",
            alignItems: "center",
            color: value
              ? selectedVariant.textColor
              : selectedVariant.placeholderColor,
            fontWeight: value ? "500" : "400",
          },
          "& .MuiOutlinedInput-input": {
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "6px",
            borderColor: "default",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor:
              variant === "white"
                ? selectedVariant.borderColor
                : "rgba(0, 193, 212, 1)",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor:
              variant === "white"
                ? selectedVariant.borderColor
                : "rgba(0, 193, 212, 1)",
          },
        }}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options?.map((option: OptionType, index: number) => (
          <MenuItem
            key={`${option.value}-${index}`}
            value={option.value}
            sx={{
              fontWeight: 400,
              fontSize: option?.label.startsWith("▶") ? "14px" : "18px",
            }}
          >
            {renderColorDot(option.label)}
            {option.icon && (
              <span className={styles.margin}>
                {renderIcon(
                  multiple
                    ? Array.isArray(value) &&
                        value.includes(String(option.value))
                    : value === String(option.value),
                )}
              </span>
            )}
            {option.image && (
              <Avatar
                src={
                  typeof option.image === "string"
                    ? option.image
                    : (option.image as unknown as string)
                }
                alt={option.label}
                sx={{
                  width: 24,
                  height: 24,
                  marginRight: 2,
                  borderRadius: "50%",
                }}
              />
            )}
            {option.status && (
              <span
                style={{
                  backgroundColor: option.status,
                }}
                className={styles.status}
              />
            )}
            {option.label.match(colorHexRegex)
              ? option.label.split(":")[0]
              : option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && (
        <FormHelperText
          style={{
            color: error ? "rgba(212, 38, 32, 1)" : "rgba(0, 0, 0, 0.54)",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          {helperText.replaceAll("*", "")}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
