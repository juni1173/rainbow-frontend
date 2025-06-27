"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";
import Cookies from "js-cookie";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import CustomTextField from "@/src/components/common/CustomTextfield";
import CustomButton from "@/src/components/common/CustomButton";
import { useSignInMutation } from "@/src/redux/services/auth/authApi";
import { setCredentials } from "@/src/redux/services/auth/authSlice";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn({ email, password }).unwrap();

      if (response.challenge === "NEW_PASSWORD_REQUIRED") {
        sessionStorage.setItem("auth_session", response.session);
        sessionStorage.setItem("auth_email", email);
        setRedirecting(true);
        router.push("/auth/login-password");
      } else if (response.id_token) {
        sessionStorage.setItem("id_token", response.id_token);
        sessionStorage.setItem("auth_email", email);
        Cookies.set("id_token", response.id_token);
        dispatch(setCredentials({ token: response.id_token, email }));
        setRedirecting(true);
        router.push("/dashboard");
      } else {
        setError(response.message || "Unexpected error.");
      }
    } catch (err: any) {
      setError(err?.data?.message || "Login failed.");
    }
  };

  if (redirecting) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          Sign in
        </Typography>

        <Stack gap={2}>
          <CustomTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {/* <CustomTextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          /> */}
          <CustomTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </CustomButton>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="body2" align="center" mt={4}>
          <Link href="/auth/forgot-password">Forgot password?</Link>
        </Typography>
      </Box>
    </Container>
  );
}
