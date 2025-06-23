"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CustomFilterSelect from "../../../components/common/CustomFilterSelect";
import CustomSearchField from "../../../components/common/CustomSearch";
import { Search } from "@mui/icons-material";
import styles from "./style.module.scss";

const filterItems = [
  { label: "1 Month" },
  { label: "2 Month" },
  { label: "Year" },
];

const Header = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}) => {
  const [selectedValue, setSlectedValue] = useState<string>("");

  const handleSelect = (label: string | null) => {
    setSlectedValue(label ?? "dummy");
  };

  return (
    <Box className={styles.root}
    >
      <Box className={styles.secondaryBox}
        display="flex"
        alignItems="center"
      >
        <Typography variant="h1">Hot Leads</Typography>
        <Typography className={styles.priorityResponses}
          variant="caption"
        >
          (Priority Responses)
        </Typography>
      </Box>

      <Box className={styles.filterAndSearchBox}
      >
        <CustomFilterSelect items={filterItems} onSelect={handleSelect} />
        <CustomSearchField
          endIcon={<Search />}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Box>
    </Box>
  );
};

export default Header;
