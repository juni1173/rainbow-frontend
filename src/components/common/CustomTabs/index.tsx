"use client";
import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";

export interface TabItem {
  label: string;
  // content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface CustomMuiTabsProps {
  tabs: TabItem[];
  activeColor?: string;
  onTabChange?: (label: string) => void;
}

function a11yProps(index: number) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tabpanel-${index}`,
  };
}

const CustomTabs: React.FC<CustomMuiTabsProps> = ({
  tabs,
  activeColor = "#8647F5",
  onTabChange,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onTabChange?.(tabs[newValue].label);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="custom tabs"
        TabIndicatorProps={{
          style: { backgroundColor: activeColor },
        }}
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 400,
            borderRadius: "8px",
            fontSize: 16,
            color: "#0D0D12",
            px: 2,
            py: 1,
          },
          "& .Mui-selected": {
            color: activeColor,
            fontSize: "16px",
            fontWeight: "600",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            iconPosition="start"
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            hidden={value !== index}
            id={`custom-tabpanel-${index}`}
            aria-labelledby={`custom-tab-${index}`}
          >
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default CustomTabs;
