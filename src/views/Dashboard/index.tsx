"use client";
import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import LeadCard from "./LeadCard";
import CustomTabs from "@/components/common/CustomTabs";
import { leads, tabItems } from "./LeadCard/data";
import Header from "@/views/Dashboard/Header";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredLeads = leads.filter((lead) => {
    if (activeTab === "All") return true;
    if (activeTab === "Urgent") return !lead.isGoingCold;
    if (activeTab === "Going Cold") return lead.isGoingCold;
    return true;
  });
  return (
    <Box
      sx={{
        padding: "48px",
      }}
    >
      <Header />

      <Box
        borderRadius={"12px"}
        padding={1}
        bgcolor={"#fff"}
        boxShadow={"0px 4px 12px rgba(0, 0, 0, 0.05)"}
        mt={4}
      >
        <Box mb={2.5}>
          <CustomTabs
            tabs={tabItems}
            onTabChange={(label) => setActiveTab(label)}
          />
        </Box>
        <Stack gap={1}>
          {filteredLeads.map((lead, index) => (
            <LeadCard key={index} {...lead} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
