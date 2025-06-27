"use client";
import { Back, Call, Urgent } from "@/src/assests/icons";
import {
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import User from "../../assests/images/user.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import { getInitials } from "@/src/utils/GetInitials";
interface LeadHeaderProps {
  name: string;
  status: string;
  onRefreshClick: () => void;
}
const LeadHeader = ({ name, status, onRefreshClick }: LeadHeaderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const handleRouteBack = () => {
    const page = searchParams.get("page") || "1";
    router.push(`/dashboard?page=${page}`);

    // router.push("/dashboard");
  };
  const initials = getInitials(name);
  const handleRefreshClick = () => {
    setLoading(true);
    setTimeout(() => {
      onRefreshClick();
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingBottom={1.6}
      >
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <Box
            sx={{
              background: "#FFFFFF",
              padding: "8px 16px",
              boxShadow: "0px 1px 2px 0px #0D0D120F",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Back onClick={handleRouteBack} />
            {/* <Back onClick={() => router.back()} /> */}
          </Box>
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 60,
              height: 60,
              fontSize: 32,
              mb: 2,
            }}
          >
            {initials || "U"}
          </Avatar>
          <Stack gap={1}>
            <Typography fontWeight={600} variant="h5" color="#0D0D12">
              {name}
            </Typography>
            <Chip
              label={status}
              size="small"
              sx={{
                background: "#FFF0F3",
                color: "#36394A",
                fontSize: "14",
                fontWeight: "500",
              }}
              icon={<Urgent />}
            />
          </Stack>
        </Box>
        <Box display={"flex"} alignItems="center" gap={2}>
          {loading ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 32,
                height: 32,
              }}
            >
              <CircularProgress size={24} sx={{ color: "#0062FF" }} />
            </Box>
          ) : (
            <Refresh
              onClick={handleRefreshClick}
              sx={{
                cursor: "pointer",
                color: "#0062FF",
                "&:hover": { color: "#004BB5" },
              }}
            />
          )}
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
            <Call />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ cursor: "pointer" }}
            >
              Call logs
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginX: "-30px", borderColor: "#DFE1E7" }} />
    </>
  );
};

export default LeadHeader;
