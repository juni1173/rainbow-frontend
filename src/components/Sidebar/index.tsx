"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { Box, Typography } from "@mui/material";
import { sidebarButtons, sidebarItems, sidebarItemsMobile } from "./sidebarItem";
import Logo from "../../assests/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation"; 


const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("admin");
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("hot-leads");
  const router = useRouter(); 

  const pathMap: Record<string, string> = {
    "Hot Leads": "/dashboard",
    "AI Outreach": "/ai-reach",
    "Tasks & Reminder": "/tasks",
    Analytics: "/analytics",
    "Admin Oversight": "/admin-oversight",
  };

  return (
    <>
      <Box
        className={styles.sidebar}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Image
          src={Logo}
          alt="logo"
          style={{ marginBottom: "48px", marginTop: "32px", cursor: "pointer" }}
          onClick={() => router.push("/dashboard")} 
        />
        <Box
          sx={{
            display: "inline-flex",
            border: "1px solid #ccc",
            borderRadius: "12px",
            overflow: "hidden",
            userSelect: "none",
            padding: "4px",
            marginBottom: "32px",
          }}
        >
          {sidebarButtons.map(({ label, id }: any) => (
            <Typography
              key={id}
              onClick={() => setActiveButton(id)}
              variant="body2"
              sx={{
                cursor: "pointer",
                padding: "8px 16px",
                backgroundColor:
                  activeButton === id ? "#F6F8FA" : "transparent",
                color: activeButton === id ? "#0D0D12" : "#0D0D12",
                userSelect: "none",
                font: activeButton === id ? "16px" : "12px",
                borderRadius: "10px",
                fontWeight: activeButton === id ? "600" : "400",
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
        <Box className={styles.itemsList}>
          {sidebarItems.map(({ label, icon: Icon }: any) => (
            <Box
              key={label}
              className={`${styles.sidebarItem} ${
                activeSidebarItem === label ? styles.active : ""
              }`}
              onClick={() => {
                setActiveSidebarItem(label);
                if (pathMap[label]) {
                  router.push(pathMap[label]); 
                }
              }}
              sx={{ cursor: "pointer" }}
            >
              <Icon />
              <Typography
                variant="body1"
                sx={{
                  marginLeft: 1,
                  color: activeSidebarItem === label ? "#7A4DF5" : "#0D0D12",
                  fontWeight: activeSidebarItem === label ? 600 : 400,
                  fontSize: "18px",
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mobile responsive sidebar */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-around",
          alignItems: "center",
          width: "100vw",
          height: 70,
          position: "fixed",
          bottom: 0,
          left: 0,
          bgcolor: "#fff",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          borderTop: "1px solid #eee",
          zIndex: 1300,
        }}
      >
        {sidebarItemsMobile.map(({ label, icon: Icon }) => (
          <Box
            key={label}
            onClick={() => {
              setActiveTab(label.toLowerCase().replace(/\s+/g, "-"));
              if (pathMap[label]) {
                router.push(pathMap[label]);
              }
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight:
                activeTab === label.toLowerCase().replace(/\s+/g, "-")
                  ? 600
                  : 400,
              position: "relative",
              flex: 1,
              px: 0,
              userSelect: "none",
            }}
          >
            <Icon sx={{ fontSize: 28, mb: 0.5 }} />
            <Typography
              variant="caption"
              sx={{
                fontSize: 10,
                color:
                  activeTab === label.toLowerCase().replace(/\s+/g, "-")
                    ? "#7A4DF5"
                    : "#444",
                fontWeight:
                  activeTab === label.toLowerCase().replace(/\s+/g, "-")
                    ? "600"
                    : "400",
              }}
            >
              {label}
            </Typography>
            {activeTab === label.toLowerCase().replace(/\s+/g, "-") && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  height: 3,
                  width: "60%",
                  bgcolor: "#7A4DF5",
                  borderRadius: 2,
                  mt: 0.5,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Sidebar;
