// SidebarItems.tsx
import { Aireach, Analytics, LeadsIcon, Tasks, UserIcon } from "@/assests/icons";
export const sidebarButtons = [
  { label: "Admin User", id: "admin" },
  { label: "Solo User", id: "solo" },
];

export const sidebarItems = [
  { label: "Hot Leads", icon: LeadsIcon },
  { label: "AI Outreach", icon: Aireach },
  { label: "Tasks & Reminder", icon: Tasks },
  { label: "Analytics", icon: Analytics },
  { label: "Admin Oversight", icon: UserIcon },
];
