"use client";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeadHeader from "./LeadHeader";
import LeadChatSection from "./LeadChat";
import CallLogsSection from "./LeadCallLog";
import LeadDetailsSidebar from "./LeadDetailSidebar";
import ChatInputBox from "./ChatInputBox";
import { useGetLeadByIdQuery } from "@/redux/services/leads/leadsApi";

const LeadDetails = ({ leadId }: { leadId: string }) => {
  const [refreshChat, setRefreshChat] = useState(0);
  const { data, isLoading, error, isFetching, refetch } =
    useGetLeadByIdQuery(leadId);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isFetching)
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error || !data?.data?.length) return <div>Error loading lead data</div>;

  const lead = data.data[0];

  const name = lead.first_name + " " + (lead.last_name || "");
  const status =
    lead.inquiry_status + (lead.inquiry_type ? ` (${lead.inquiry_type})` : "");

  return (
    <Box sx={{ padding: "20px 32px 32px 32px" }}>
      <LeadHeader
        name={name}
        status={status}
        onRefreshClick={() => setRefreshChat((prev) => prev + 1)}
      />
      <Box display="flex" flexGrow={1}>
        <Box width="75%" bgcolor="#fff" paddingRight={"32px"}>
          <LeadChatSection
            refreshTrigger={refreshChat}
            leadId={leadId}
            userName={name}
          />
          <CallLogsSection lead_id={leadId} />
          <ChatInputBox leadId={leadId} />
        </Box>
        <LeadDetailsSidebar data={data} />
      </Box>
    </Box>
  );
};

export default LeadDetails;
