import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Box display={"flex"} gap={2} alignItems={"center"}>
        <Typography variant="h1">Admin Oversight</Typography>
      </Box>
    </Box>
  );
};

export default Header;
