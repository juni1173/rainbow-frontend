"use client";
import React, { useState } from "react";
import { Box, Container, Typography, Link, Stack, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/components/common/CustomTextfield";
import CustomButton from "@/components/common/CustomButton";
import { useSelfChangePasswordMutation } from "@/redux/services/auth/authApi";

const SelfChangePassword = () => {
  const router = useRouter();
  const [prevPassword, setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info");
  const [selfChangePassword] = useSelfChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!prevPassword || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);

      await selfChangePassword({
        previous_password: prevPassword,
        new_password: password,
      }).unwrap();
      setMessage("Password changed successfully!");

      setTimeout(() => {
        sessionStorage.removeItem("auth_session");
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
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
        <Typography variant="h5" align="center" mb={2}>
          Create Your New Password
        </Typography>
        <Typography variant="body2" align="center" color="gray" mb={3}>
          Enter your new password below to secure your account.
        </Typography>

        <Stack gap={2}>
          <CustomTextField
            label="Previous Password"
            type="password"
            fullWidth
            onChange={(e) => setPrevPassword(e.target.value)}
            placeholder="Write Previous password"
          />
          <CustomTextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </Stack>

        {error && (
          <Typography variant="body2" color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ padding: "12px", marginTop: 3 }}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </CustomButton>
        <Typography variant="body2" align="center" mt={4}>
          <Link href="/dashboard">Back to home</Link>
        </Typography>
        {message && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default SelfChangePassword;
