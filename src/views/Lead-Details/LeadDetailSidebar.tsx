"use client";
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import {
  Call,
  Inquiry,
  Notes,
  SmallMail,
  SmallPhone,
  Urgent,
} from "@/src/assests/icons";
import {
  useGetLeadsEnumsQuery,
  useUpdateLeadMutation,
} from "@/src/redux/services/leads/leadsApi";
import { toast } from "react-toastify";
import CustomSelect from "@/src/components/common/CustomSelect";

const LeadDetailsSidebar = ({ data }: any) => {
  const [lead, setLead] = useState(data?.data?.[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [inquiryType, setInquiryType] = useState(lead.inquiry_type || "");
  const [inquiryStatus, setInquiryStatus] = useState(lead.inquiry_status || "");
  const [tag, setTag] = useState(lead.tag || "");
  const [notes, setNotes] = useState(lead.notes || "");

  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
  const { data: enumsData, refetch } = useGetLeadsEnumsQuery();

  const inquiryTypeOptions = useMemo(
    () =>
      enumsData?.inquiry_types?.map((type: string) => ({
        label: type,
        value: type,
      })) || [],
    [enumsData]
  );

  const inquiryStatusOptions = useMemo(
    () =>
      enumsData?.inquiry_status?.map((status: string) => ({
        label: status,
        value: status,
      })) || [],
    [enumsData]
  );

  const tagOptions = useMemo(
    () =>
      enumsData?.tags?.map((tagItem: string) => ({
        label: tagItem,
        value: tagItem,
      })) || [],
    [enumsData]
  );

  const handleSave = async () => {
    try {
      const response = await updateLead({
        lead_id: lead.lead_id,
        inquiry_type: inquiryType,
        inquiry_status: inquiryStatus,
        tag,
        notes,
      }).unwrap();

      setLead((prev: any) => ({
        ...prev,
        inquiry_type: inquiryType,
        inquiry_status: inquiryStatus,
        tag,
        notes,
      }));
      setIsEditing(false);
      refetch();
      toast.success("Lead updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update lead. Please try again.");
    }
  };

  return (
    <Box width="30%" p={4} bgcolor="#fff" borderLeft="1px solid #DFE1E7">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        mb={3}
      >
        <Typography fontWeight={600} variant="h5" color="#0D0D12">
          Lead Details
        </Typography>
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          <Edit />
        </IconButton>
      </Box>
      <Stack spacing={4}>
        <Box>
          <Typography variant="body2" color="#666D80" mb={1}>
            Name
          </Typography>
          <Typography variant="body2" color="#0D0D12" fontWeight={600}>
            {lead.first_name} {lead.last_name}
          </Typography>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <SmallPhone />
            <Typography variant="body2" color="#666D80">
              Phone Number
            </Typography>
          </Box>
          <Typography variant="body2" color="#0D0D12" fontWeight={600}>
            {lead.phone || "N/A"}
          </Typography>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <SmallMail />
            <Typography variant="body2" color="#666D80">
              Email
            </Typography>
          </Box>
          <Typography variant="body2" color="#0D0D12" fontWeight={600}>
            {lead.email || "N/A"}
          </Typography>
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Inquiry />
            <Typography variant="body2" color="#666D80">
              Inquiry Type
            </Typography>
          </Box>
          {isEditing ? (
            <CustomSelect
              // label="Select Inquiry Type"
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              options={inquiryTypeOptions}
              placeholder="Select inquiry type"
            />
          ) : (
            <Typography variant="body2" color="#0062FF" fontWeight={500}>
              {lead.inquiry_type || "N/A"}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="body2" color="#666D80" mb={1}>
            Status
          </Typography>
          {isEditing ? (
            <CustomSelect
              // label="Select Status"
              value={inquiryStatus}
              onChange={(e) => setInquiryStatus(e.target.value)}
              options={inquiryStatusOptions}
              placeholder="Select status"
            />
          ) : (
            <Chip
              label={lead.inquiry_status || "Unknown"}
              size="medium"
              sx={{
                background: "#FFF0F3",
                color: "#36394A",
                fontSize: "14px",
                fontWeight: 600,
              }}
              icon={<Urgent />}
            />
          )}
        </Box>

        <Box>
          <Typography variant="body2" color="#666D80" mb={1}>
            Tag
          </Typography>
          {isEditing ? (
            <CustomSelect
              // label="Select Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              options={tagOptions}
              placeholder="Select tag"
            />
          ) : (
            <Typography variant="body2" color="#0062FF" fontWeight={500}>
              {lead.tag || "N/A"}
            </Typography>
          )}
        </Box>

        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Notes />
            <Typography variant="body2" color="#666D80">
              Notes
            </Typography>
          </Box>
          <TextField
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                fontSize: "15px",
                fontWeight: 600,
                color: "#000",
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "15px",
                fontWeight: 600,
                color: "#0D0D12",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#000",
                fontWeight: 600,
                fontSize: "14px",
              },
            }}
          />
        </Box>

        {isEditing && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditing(false)}
              sx={{ marginRight: 2 }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default LeadDetailsSidebar;
