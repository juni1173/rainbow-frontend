"use client";
import { Box, Typography, Avatar, Stack, Button, Chip } from "@mui/material";
import StatusTag from "./StatusTag";
import ActionButtons from "./ActionButtons";
import { Cold, Typing, Urgent } from "@/assests/icons";
import StatusButton from "./StatusButton";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import { DisplaySettings, Height } from "@mui/icons-material";

interface LeadCardProps {
  lead_id: string;
  name: string;
  initials: string;
  isGoingCold?: boolean;
  serviceType: string;
  serviceName: string;
  message: string;
  avatarUrl?: string;
  tag?: string;
}

const LeadCard = ({
  lead_id,
  name,
  initials,
  isGoingCold = false,
  serviceType,
  serviceName,
  message,
  tag,

  avatarUrl,
}: LeadCardProps) => {
  const router = useRouter();
  return (
    <Box className={styles.root}
      onClick={() => router.push(`/dashboard/${lead_id}`)} // <-- navigate to dynamic route
    >
      <Box display="flex" width="30%" gap={2} className = {styles.secondaryRoot} 
      >
        <Avatar className={styles.avator}
          src={avatarUrl}
          sx={{
            bgcolor: "#D9EFFF",
            color: "#0062FF",
          }}
        >
          {initials}
        </Avatar>

        <Stack>
          <Stack spacing={1.5} className={styles.firstRow} 
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body1" className={styles.name}
              >{name}</Typography>

              <Box
              // sx={{ 
              // display: { sm: "none", md: "block" },
              // width: "auto",
              // flexDirection: "row",
              // }}
              >
                {tag?.toLowerCase() === "going cold" ? (
                  <StatusTag
                    label="Going Cold"
                    color="#FAEDCC"
                    icon={<Cold sx={{ fontSize: 16,
                     }}
                    />}
                  />
                ) : (
                  <StatusTag
                    label={tag || "Urgent"}
                    color="#FFF0F3"
                    icon={<Urgent />}
                  />
                )}
              </Box>

            </Stack>


            {/* {message !== "No message available" && ( */}
            <Box className = {styles.messageIconBox}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "4px", sm: "6px", md: "8px" },
                borderRadius: "8px",
                padding: { xs: "4px 6px", sm: "5px 8px", md: "6px 10px" },
                background: "#ECEFF3",
                color: "#red",
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                fontWeight: 500,
              }}
              
            >
              <Typing />
              <Typography variant="subtitle1" color="text.secondary" className={styles.messageIconLable} 
              >
                {serviceType}
              </Typography>
            </Box>
            {/* )} */}
          </Stack>
        </Stack>

      </Box>

      <Box width="30%" className={styles.serviceNameTypeBox}
      >
        <Typography variant="body2" color="#666D80" mb={2.5} className={styles.serviceName}
        >
          {serviceName}
        </Typography>
        <Typography variant="body1" fontSize={16} color="#0D0D12" className={styles.message}
        >
          {message}
        </Typography>
      </Box>

      <Box className={styles.icons}
      >
        {isGoingCold ? (
          serviceType.toLowerCase().startsWith("missed") ? (
            <>
              <StatusButton type="snoozed" label="Snooze for later" />
              <StatusButton type="meeting" label="Meeting set for 3 PM" />
            </>
          ) : (
            <>
              <StatusButton type="addressed" label="Addressed" />
              <StatusButton type="meeting" label="Meeting set for 3 PM" />
            </>
          )
        ) : (
          <ActionButtons />
        )}
      </Box>
    </Box>
  );
};

export default LeadCard;
