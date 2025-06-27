"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomTextField from "@/src/components/common/CustomTextfield";
import CustomButton from "@/src/components/common/CustomButton";
import { useResetPasswordMutation } from "@/src/redux/services/auth/authApi";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Page = () => {
  const router = useRouter();
  const [session, setSession] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setMail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    if (storedEmail) {
      setMail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await resetPassword({
        confirmation_code: confirmationCode,
        new_password: newPassword,
        email,
      }).unwrap();

      sessionStorage.removeItem("email");
      router.push("/auth/sign-in");
    } catch (err: any) {
      setError(err?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       "https://ajzjuk1jch.execute-api.us-east-2.amazonaws.com/dev/auth/changePass/reset",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           confirmation_code: confirmationCode,
  //           new_password: newPassword,
  //           email: email,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok) {
  //       sessionStorage.removeItem("email");
  //       router.push("/sign-in");
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
          {/* <CustomTextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Write new password"
          /> */}
          <CustomTextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={newPassword}
            onChange={(e:any) => setNewPassword(e.target.value)}
            placeholder="Write new password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <CustomTextField
            label="Confirmation Code"
            fullWidth
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            placeholder="Enter confirmation code"
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
          {loading ? "Reseting..." : "Reset Password"}
        </CustomButton>

        {/* <Typography variant="body2" align="center" mt={4}>
          <Link href="/sign-in">Back to Sign In</Link>
        </Typography> */}
      </Box>
    </Container>
  );
};

export default Page;
