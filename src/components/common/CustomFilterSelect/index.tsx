"use client";
import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  Select,
  InputBase,
  capitalize,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Filter } from "@/assests/icons";

interface SelectItem {
  label: string;
  icon?: React.ReactNode;
}
interface CustomFilterSelectProps {
  items: SelectItem[];
  onSelect: (label: string | null) => void;
  height?: string;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  items,
  onSelect,
  height = "44px",
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleSelectOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = () => {
    setOpen(false);
  };

  const handleItemClick = (label: string) => {
    const newSelectedItem = selectedItem === label ? null : label;
    setSelectedItem(newSelectedItem);
    onSelect(newSelectedItem);
    setOpen(false);
  };

  const handleHover = (label: string | null) => {
    setHoveredItem(label);
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "8px",
        border: "1px solid #ddd",
        padding: "3px 6px",
        marginTop: "8px",
        cursor: "pointer",
        height: height,
      }}
    >
      {/* <Filter sx={{ marginRight: "8px" }} /> */}

      <Select
        value={selectedItem || ""}
        open={open}
        onOpen={handleSelectOpen}
        onClose={handleSelectClose}
        displayEmpty
        input={<InputBase />}
        sx={{
          "& .MuiSelect-select-MuiInputBase-input": {
            marginRight: "4px",
          },
          "& .MuiSelect-icon": { display: "none" },
          minWidth: "40px",
          padding: "3px 6px",
          borderRadius: "8px",
        }}
        MenuProps={{
          PaperProps: {
            style: {
              minWidth: "270px",
              marginTop: "6px",
            },
          },
        }}
        renderValue={(selected) => (
          <Typography variant="body2" mt={0.3} sx={{ marginRight: "-34px" }}>
            {/* { "Filter"} */}
            <Filter/>
          </Typography>
        )}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            value={item.label}
            onMouseEnter={() => handleHover(item.label)}
            onMouseLeave={() => handleHover(null)}
            onClick={() => handleItemClick(item.label)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              backgroundColor:
                selectedItem === item.label || hoveredItem === item.label
                  ? "#F9FAFB"
                  : "inherit",
              "&:hover": { backgroundColor: "#F9FAFB" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {item.icon && <Box sx={{ color: "#0D47A1" }}>{item.icon}</Box>}
              <Typography variant="body2">
                {(item.label)}
              </Typography>
            </Box>

            {(selectedItem === item.label || hoveredItem === item.label) && (
              <CheckCircle sx={{ color: "rgba(0, 193, 212, 1)" }} />
            )}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CustomFilterSelect;
