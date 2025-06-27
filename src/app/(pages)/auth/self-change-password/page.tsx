"use client";
import React, { useState } from "react";
import { Box, Container, Typography, Link, Stack, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/src/components/common/CustomTextfield";
import CustomButton from "@/src/components/common/CustomButton";
import { useSelfChangePasswordMutation } from "@/src/redux/services/auth/authApi";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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

  const [showPrevPassword, setShowPrevPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleShowPrevPassword = () => setShowPrevPassword((prev) => !prev);
  const toggleShowNewPassword = () => setShowNewPassword((prev) => !prev);

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
          {/* <CustomTextField
            label="Previous Password"
            type="password"
            fullWidth
            onChange={(e) => setPrevPassword(e.target.value)}
            placeholder="Write Previous password"
          /> */}
          <CustomTextField
            label="Previous Password"
            type={showPrevPassword ? "text" : "password"}
            fullWidth
            value={prevPassword}
            onChange={(e:any) => setPrevPassword(e.target.value)}
            placeholder="Write Previous password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPrevPassword} edge="end">
                    {showPrevPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* <CustomTextField
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          /> */}
          <CustomTextField
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e:any) => setPassword(e.target.value)}
            placeholder="Enter new password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowNewPassword} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
