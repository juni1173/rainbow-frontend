"use client";
import { Back, Call, Urgent } from "@/assests/icons";
import { Box, Typography, Button, Chip, Stack, Divider } from "@mui/material";
import User from "../../assests/images/user.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
interface LeadHeaderProps {
  name: string;
  status: string;
}
const LeadHeader = ({ name, status }: LeadHeaderProps) => {
  const router = useRouter();
  const handleRouteBack = () => {
    router.push("/dashboard");
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
          </Box>
          <Image src={User} alt="user" />
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
      <Divider sx={{ marginX: "-30px", borderColor: "#DFE1E7" }} />
    </>
  );
};

export default LeadHeader;
