import CustomTabs from "@/src/components/common/CustomTabs";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { tabItems } from "./data";

const UserContent = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <Box mb={2.5}>
      <CustomTabs
        tabs={tabItems}
        onTabChange={(label: any) => setActiveTab(label)}
      />
    </Box>
  );
};

export default UserContent;
