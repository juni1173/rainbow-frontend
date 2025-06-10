"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/sign-in" ||
    pathname === "/auth/login-password" ||
    pathname === "/auth/forgot-password" ||
    pathname === "/auth/reset-password" ||
    pathname === "/auth/self-change-password";

  return (
    <Provider store={store}>
      {isAuthPage ? (
        <>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <Sidebar />
          </Box>
          <Box component="main" sx={{ flexGrow: 1, overflowY: "auto" }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </Box>
        </Box>
      )}
    </Provider>
  );
}
