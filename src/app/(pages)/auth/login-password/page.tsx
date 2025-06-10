"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/components/common/CustomTextfield";
import CustomButton from "@/components/common/CustomButton";
import { useFirstLoginPasswordMutation } from "@/redux/services/auth/authApi";
import Cookies from "js-cookie";

const FirstLoginPassword = () => {
  const router = useRouter();
  const [session, setSession] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setMail] = useState("");

  const [firstLoginPassword] = useFirstLoginPasswordMutation();

  useEffect(() => {
    const storedSession = sessionStorage.getItem("auth_session");
    const storedEmail = sessionStorage.getItem("auth_email");

    if (storedEmail) {
      setMail(storedEmail);
    }

    if (storedSession) {
      setSession(storedSession);
    } else {
      setError("Session is missing. Please sign in again.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      setLoading(true);

      const payload = {
        session,
        new_password: newPassword,
        email,
      };

      const response = await firstLoginPassword(payload).unwrap();

      // Success logic
      // sessionStorage.removeItem("auth_session");
      sessionStorage.setItem("id_token", response.id_token);
      sessionStorage.setItem("auth_email", email);
      Cookies.set("id_token", response.id_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!newPassword || !confirmPassword) {
  //     setError("Both password fields are required.");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setError("Passwords do not match.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       "https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/auth/changePass/firstLogIn",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           session: session,
  //           new_password: newPassword,
  //           email: email,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       sessionStorage.removeItem("auth_session");
  //       router.push("/dashboard");
  //     } else {
  //       setError(data?.message || "Failed to reset password.");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
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
          Create Your New Password
        </Typography>
        <Typography variant="body2" align="center" color="gray" mb={3}>
          Enter your new password below to secure your account.
        </Typography>

        <Stack gap={2}>
          <CustomTextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Write new password"
          />
          <CustomTextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
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
          {loading ? "Changing..." : "change Password"}
        </CustomButton>

        {/* <Typography variant="body2" align="center" mt={4}>
          <Link href="/sign-in">Back to Sign In</Link>
        </Typography> */}
      </Box>
    </Container>
  );
};

export default FirstLoginPassword;
