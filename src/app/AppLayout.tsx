"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/views/Dashboard/Header";
import { Box } from "@mui/material";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/sign-in" || pathname === "/forgot-password";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
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
  );
}
