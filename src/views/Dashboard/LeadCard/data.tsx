import React from "react";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import ErrorIcon from "@mui/icons-material/Error";
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface LeadCardProps {
  name: string;
  initials: string;
  isGoingCold?: boolean;
  serviceType: string;
  serviceName: string;
  message: string;
  avatarUrl?: string;
}
export const tabItems = [
  {
    label: "All",
    content: <div>All Leads Content</div>,
  },
  {
    label: "Urgent",
    content: <div>Urgent Leads Content</div>,
  },
  {
    label: "Going Cold",
    content: <div>Cold Leads Content</div>,
  },
];

export const leads: LeadCardProps[] = [
  {
    name: "Jared Bowen",
    initials: "JB",
    isGoingCold: true,
    serviceType: "Replied 5min ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    serviceType: "Missed 2h ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    isGoingCold: true,

    serviceType: "Replied 5min ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    isGoingCold: true,

    serviceType: "Missed 2h ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    serviceType: "Missed 2h ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    serviceType: "Replied 5min ago",
    serviceName: "Burial Services",
    message: "Can we Speak tomorrow?",
    isGoingCold: true,
  },
];
