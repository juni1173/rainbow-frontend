"use client";
import { Box, Typography, Avatar, Stack, Button, Chip } from "@mui/material";
import StatusTag from "./StatusTag";
import ActionButtons from "./ActionButtons";
import { Cold, Typing, Urgent } from "@/src/assests/icons";
import StatusButton from "./StatusButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LeadCardProps {
  lead_id: string;
  name: string;
  initials: string;
  isGoingCold?: boolean;
  serviceType: string;
  serviceName: string;
  message: string;
  avatarUrl?: string;
  tag?: string;
  page?: number;
}

const LeadCard = ({
  lead_id,
  name,
  initials,
  isGoingCold = false,
  serviceType,
  serviceName,
  message,
  tag,
  page,
  avatarUrl,
}: LeadCardProps) => {
  const router = useRouter();
  return (
    <Link href={`/dashboard/${lead_id}?page=${page}`} passHref>
      <Box
        component="a"
        sx={{
          height: "112px",
          borderRadius: "12px",
          border: "1px solid #DFE1E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          boxSizing: "border-box",
          backgroundColor: "#F6F8FA",
          // flexWrap:"wrap"
          cursor: "pointer",
        }}
        // onClick={() => router.push(`/dashboard/${lead_id}`)} // <-- navigate to dynamic route
        // onClick={() => router.push(`/dashboard/${lead_id}?page=${page}`)}
      >
        <Box display="flex" width="30%" gap={2}>
          <Avatar
            src={avatarUrl}
            sx={{
              bgcolor: "#D9EFFF",
              height: "56px",
              width: "56px",
              color: "#0062FF",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            {initials}
          </Avatar>

          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1">{name}</Typography>
              <Box sx={{ display: { sm: "none", md: "block" } }}>
                {tag?.toLowerCase() === "going cold" ? (
                  <StatusTag
                    label="Going Cold"
                    color="#FAEDCC"
                    icon={<Cold sx={{ fontSize: 16 }} />}
                  />
                ) : (
                  <StatusTag
                    label={tag || "Urgent"}
                    color="#FFF0F3"
                    icon={<Urgent />}
                  />
                )}
              </Box>
            </Stack>
            {message !== "No message available" && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  background: "#ECEFF3",
                  color: "#36394A",
                }}
              >
                <Typing />
                <Typography variant="subtitle1" color="text.secondary">
                  {serviceType}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <Box width="30%">
          <Typography variant="body2" color="#666D80" mb={2.5}>
            {serviceName}
          </Typography>
          <Typography variant="body1" fontSize={16} color="#0D0D12">
            {message}
          </Typography>
        </Box>

        <Box
          sx={{
            width: {
              xs: "100%",
              md: "50%",
              xl: "40%",
            },
          }}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          {isGoingCold ? (
            serviceType.toLowerCase().startsWith("missed") ? (
              <>
                <StatusButton type="snoozed" label="Snooze for later" />
                <StatusButton type="meeting" label="Meeting set for 3 PM" />
              </>
            ) : (
              <>
                <StatusButton type="addressed" label="Addressed" />
                <StatusButton type="meeting" label="Meeting set for 3 PM" />
              </>
            )
          ) : (
            <ActionButtons />
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default LeadCard;
