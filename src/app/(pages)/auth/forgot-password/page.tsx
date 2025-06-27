"use client";
import React, { useState } from "react";
import {
  Button,
  Typography,
  Link,
  Box,
  Container,
  Alert,
  Stack,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/src/components/common/CustomTextfield";
import CustomButton from "@/src/components/common/CustomButton";
import { useForgotPasswordMutation } from "@/src/redux/services/auth/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info");

  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      // const response = await fetch(
      //   "https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/auth/forgotPass",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email,
      //     }),
      //   }
      // );

      // const data = await response.json();
      const response = await forgotPassword({ email }).unwrap();

      sessionStorage.setItem("email", email);
      setSeverity("success");
      setMessage("Code Sent to your email");
      router.push("/auth/reset-password");
    } catch (err) {
      setSeverity("error");
      setMessage("Something went wrong. Please try again.");
    }
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setMessage("");
  //   // setLoading(true);

  //   try {
  //     const response = await forgotPassword({ email }).unwrap();
  //     setSeverity("success");
  //     setMessage(response?.message || "Reset link sent to your email");

  //     // Store email in sessionStorage for later use
  //     sessionStorage.setItem("email", email);

  //     // Redirect to login-password screen
  //     setTimeout(() => {
  //       router.push("/login-password");
  //     }, 1000); // slight delay for UX
  //   } catch (err: any) {
  //     setSeverity("error");
  //     setMessage(err?.data?.message || "Something went wrong");
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

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
          Forgot Password
        </Typography>
        <Typography variant="body2" align="center" color="gray" mb={3}>
          Enter your email below to get your verification code.
        </Typography>
        <Stack gap={2}>
          <CustomTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, mt: 1 }}
            disabled={isLoading}
          >
            Send Code
          </CustomButton>
        </Stack>
        <Typography variant="body2" align="center" mt={4}>
          <Link href="/auth/sign-in">Back to sign in</Link>
        </Typography>
        {message && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
