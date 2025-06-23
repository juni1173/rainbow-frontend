"use client";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import LeadCard from "./LeadCard";
import CustomTabs from "@/components/common/CustomTabs";
import Header from "@/views/Dashboard/Header";
import CustomButton from "@/components/common/CustomButton";
import AddLeadModal from "./AddLeadModal";
import { useGetLeadsQuery } from "@/redux/services/leads/leadsApi";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/common/CustomPagination";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 5;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const isAll = activeTab === "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 1000);

  const { data, isLoading, isFetching, refetch } = useGetLeadsQuery({
    tag: isAll ? undefined : activeTab,
    limit: ITEMS_PER_PAGE,
    offset,
    name: debouncedSearch?.trim() || undefined,
  });

  useEffect(() => {
    refetch();
  }, []);
  const leads = data?.data || [];
  const totalCount = data?.total_records || 0;

  const { data: allTagsData } = useGetLeadsQuery(
    { limit: 1000, offset: 0 },
    { skip: !isAll }
  );

  const allTagsLeads = allTagsData?.data || [];

  const tags = useMemo(() => {
    const tagSet = new Set(
      allTagsLeads.map((lead: any) => lead.tag || "Untagged")
    );
    return ["All", ...Array.from(tagSet)];
  }, [allTagsLeads]);

  const tabsData = tags.map((tag) => ({ label: String(tag) }));

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    setPage(1);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <Box padding="48px">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Box
        borderRadius="12px"
        padding={1}
        bgcolor="#fff"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.05)"
        mt={4}
      >
        <Box mb={2.5} display="flex" justifyContent="space-between">
          <CustomTabs tabs={tabsData} onTabChange={handleTabChange} />
          <Box
            display="flex"
            justifyContent="flex-end"
            height="48px"
            width={"100%"}
          >
            <CustomButton
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Add New Lead
            </CustomButton>
          </Box>
        </Box>

        <Stack gap={1}>
          {loading || isLoading || isFetching ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <CircularProgress size={50} />
            </Box>
          ) : leads.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Typography variant="body1" color="textSecondary">
                No data found
              </Typography>
            </Box>
          ) : (
            leads.map((lead: any, index: number) => {
              const truncate = (text: string = "", limit: number) =>
                text.length > limit ? text.slice(0, limit) + "..." : text;

              return (
                <LeadCard
                  key={index}
                  lead_id={lead.lead_id}
                  name={`${lead.first_name} ${lead.last_name || ""}`}
                  initials={`${lead.first_name?.[0] || ""}${
                    lead.last_name?.[0] || ""
                  }`}
                  isGoingCold={
                    lead.inquiry_status?.toLowerCase() === "going cold"
                  }
                  serviceType={truncate(lead.inquiry_status || "—", 15)}
                  serviceName={lead.inquiry_type || ""}
                  message={truncate(lead.content || "No message available", 50)}
                  avatarUrl={undefined}
                  tag={lead.tag || "Urgent"}
                />
              );
            })
          )}
        </Stack>
      </Box>

      {/* <Box display="flex" justifyContent="end" mt={2}>
        <Pagination
          count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box> */}
      <CustomPagination
        page={page}
        count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
        onChange={(val) => setPage(val)}
      />
      <AddLeadModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        refetchLeads={refetch}
      />
    </Box>
  );
};

export default Dashboard;
