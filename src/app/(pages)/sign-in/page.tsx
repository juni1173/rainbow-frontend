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
import CustomTextField from "@/components/common/CustomTextfield";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("info");

  const dummyUser = {
    email: "hamid@gmail.com",
    password: "password123",
  };
const router=useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   if (email === dummyUser.email && password === dummyUser.password) {
  setSeverity("success");
  setMessage("Congratulations! You have successfully signed in");
  setTimeout(() => {
    router.push("dashboard");
  }, 500);
}
 else {
      setSeverity("error");
      setMessage("Error: Invalid email or password");
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
        <Typography variant="h5" align="center" sx={{  marginBottom: {
    xs: "4px",   
    sm: 2,  
  },}}>
          Sign in
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginBottom: {
    xs: 2,   
    sm: 3,  
  }, color: "gray" }}
        >
          Stay updated on your professional world
        </Typography>
<Stack gap={2}>

        <CustomTextField
          label="Email or Phone"
          fullWidth
          value={email}
          onChange={(e:any) => setEmail(e.target.value)}
          placeholder="write your mail"
          />

        <CustomTextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e:any) => setPassword(e.target.value)}
          placeholder="write your password"

          />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ padding: "12px", marginBottom: 2,marginTop:2 }}
          >
          Sign in
        </Button>
          </Stack>

        {message && (
          <Alert severity={severity} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        <Typography variant="body2" align="center" mt={4}>
          <Link href="forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
