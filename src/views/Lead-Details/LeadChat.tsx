"use client";
import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import Image from "next/image";
import Avatar from "../../assests/images/Avatars.png";
import User from "../../assests/images/user.png";
import { useGetConversationQuery } from "@/redux/services/conversation/conversationApi";
import { useEffect } from "react";
import { extractTime } from "@/utils/ExtractTime";
const LeadChatSection = ({ refreshTrigger, leadId }: any) => {
  const { data, isLoading, refetch } = useGetConversationQuery({
    lead_ID: leadId,
    offset: 0,
  });
  useEffect(() => {
    refetch();
  }, [refreshTrigger]);
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <CircularProgress sx={{ m: 5 }} />;

  if (!data || !data.data || data.data.length === 0)
    return <Typography m={10} fontSize={28} fontWeight={600}>No Conversation Found!!!!!!</Typography>;
  const conversation = data.data[0];
  const message = conversation?.content || "n/a";
  const time = extractTime(conversation?.created_at);
  console.log("conversation", conversation);
  console.log("message", message);
  console.log("time", time);

  return (
    <Box p={"40px 32px 32px 0"}>
      <Stack gap={4}>
        <Box display={"flex"} alignItems={"start"} gap={2.5}>
          <Image src={Avatar} alt="avatar" />
          <Stack spacing={1.5}>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography mb={0.5} variant="body1">
                  AI Assistant
                </Typography>
                <Typography
                  mb={0.5}
                  variant="subtitle1"
                  fontWeight={400}
                  color="#666D80"
                >
                  {time}
                </Typography>
              </Box>
              <Typography variant="body2" color="#0D0D12">
                {/* Hi Danielle, thank you for reaching out. First, please accept
                our sincere condolences if you are going through a loss right
                now. We are here to support you during this difficult time.
                Based on your chooses inquiry. You will choose : <br />
                <br />{" "}
                <span style={{ fontWeight: "700" }}>Burial Services</span>
                <br />
                <br />
                If you’re comfortable, I’d be happy to guide you through the
                available options or schedule a time for a more detailed
                consultation. Let me know how you’d like to proceed, and please
                feel free to ask any questions. */}
                {message}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box display={"flex"} alignItems={"start"} gap={2.5}>
          <Image src={User} alt="avatar" />
          <Stack spacing={1.5}>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography mb={0.5} variant="body1">
                  Daniel Patty
                </Typography>
                <Typography
                  mb={0.5}
                  variant="subtitle1"
                  fontWeight={400}
                  color="#666D80"
                >
                  11:24AM
                </Typography>
              </Box>
              <Typography variant="body2" color="#0D0D12">
                “Can we speak tomorrow?”
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default LeadChatSection;
