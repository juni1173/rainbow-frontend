"use client";
import React, { useState } from "react";
import { Box, Container, Typography, Button, Link, Stack } from "@mui/material";
import CustomTextField from "@/components/common/CustomTextfield";
import CustomButton from "@/components/common/CustomButton";

const Page = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Password reset successfully!");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        paddingBlock: 12,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            marginBottom: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          Reset Your Password
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginBottom: {
              xs: 1,
              sm: 3,
            },
            color: "gray",
          }}
        >
          Enter your new password below to reset your account password.
        </Typography>
        <Stack gap={2}>

   <CustomTextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e:any) => setNewPassword(e.target.value)}
          placeholder="write new password"
          
          />

        <CustomTextField
          label="Confirm Password"
          type="password"
          fullWidth
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e:any) => setConfirmPassword(e.target.value)}
          />
          </Stack>

        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ padding: "12px", marginBottom: 2, marginTop: 2 }}
        >
          Reset Password
        </CustomButton>

        <Typography variant="body2" align="center" mt={4}>
          <Link href="/sign-in" variant="body2">
            Back to Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Page;
