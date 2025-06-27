"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { useGetCurrentUserQuery } from "@/redux/services/users/usersApi";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/common/CustomButton";
import { PasswordTwoTone } from "@mui/icons-material";

const ProfileCard = () => {
  const { data, isLoading, error, refetch } = useGetCurrentUserQuery();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const user = data?.data?.[0];
  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">Failed to load profile.</Typography>
      </Box>
    );
  }

  const { first_name, last_name, email, role } = user;
  const initials = `${first_name?.[0] || ""}${
    last_name?.[0] || ""
  }`.toUpperCase();

  const handleChangePassword = () => {
    setLoading(true);
    router.push("/auth/self-change-password");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={4}
        sx={{
          padding: "32px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "760px",
        }}
      >
        <Box>
          <Typography variant="h1" fontWeight="bold" mb={2}>
            Profile
          </Typography>
          <Divider sx={{ mb: 2, ml: "-32px", mr: "-32px" }} />
        </Box>

        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          mb={5}
        >
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 80,
              height: 80,
              fontSize: 32,
              mb: 2,
            }}
          >
            {initials || "U"}
          </Avatar>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            onClick={handleChangePassword}
            sx={{ cursor: "pointer" }}
          >
            <CustomButton
              variant="outlined"
              sx={{
                color: "#6B39F4",
                fontWeight: 600,
                fontSize: "16px",
                userSelect: "none",
              }}
              startIcon={<PasswordTwoTone/>}
            >
              Change Password
            </CustomButton>
          </Box>
        </Box>

        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          mb={3}
        >
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1" color="text.secondary">
            {first_name} {last_name}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          mb={3}
        >
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body1" color="text.secondary">
            {email || "No email provided"}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
          mb={3}
        >
          <Typography variant="h6">Role:</Typography>
          <Typography variant="body1" color="text.secondary">
            {role || "User"}
          </Typography>
        </Box>
        <Box mt={8} display="flex" justifyContent="end">
          <CustomButton
            variant="outlined"
            customColor="brown"
            onClick={() => router.back()}
          >
            Go Back
          </CustomButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileCard;
