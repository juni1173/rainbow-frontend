import { Box } from "@mui/material";
import React from "react";
import LeadHeader from "./LeadHeader";
import LeadChatSection from "./LeadChat";
import CallLogsSection from "./LeadCallLog";
import LeadDetailsSidebar from "./LeadDetailSidebar";
import ChatInputBox from "./ChatInputBox";

const AiReach = () => {
  return (
    <Box sx={{ padding: "20px 32px 32px 32px" }}>
      <LeadHeader />
      <Box display="flex" flexGrow={1}>
        <Box width="75%"  bgcolor="#fff" paddingRight={"32px"}>
          <LeadChatSection />
          <CallLogsSection />
          <ChatInputBox/>
        </Box>
        <LeadDetailsSidebar />
      </Box>
    </Box>
  );
};

export default AiReach;
