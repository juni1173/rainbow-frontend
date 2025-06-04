"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
        <>{children}</>
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
          </Box>
        </Box>
      )}
    </Provider>
  );
}
