"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomFilterSelect from "../../../components/common/CustomFilterSelect";
import CustomSearchField from "../../../components/common/CustomSearch";
import { Search } from "@mui/icons-material";
const filterItems = [
  { label: "1 Month" },
  { label: "2 Month" },
  { label: "Year" },
];
const Header = () => {
  const [selectedValue, setSlectedValue] = useState<string>("");

  const handleSelect = (label: string | null) => {
    setSlectedValue(label ?? "dummy");
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Typography variant="h1">Hot Leads</Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "18px", fontWeight: "400", color: "#666D80" }}
          >
            (Priority Responses)
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} gap={2}>
        <CustomFilterSelect items={filterItems} onSelect={handleSelect} />
        <CustomSearchField endIcon={<Search />} />
      </Box>
    </Box>
  );
};

export default Header;
