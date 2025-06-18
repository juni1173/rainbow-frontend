interface LeadCardProps {
  name: string;
  initials: string;
  isGoingCold?: boolean;
  serviceType: string;
  serviceName: string;
  message: string;
  avatarUrl?: string;
  tag?: string;
}
export const tabItems = [
  { label: "All" },
  { label: "Urgent" },
  { label: "Going Cold" },
];

export const leads: LeadCardProps[] = [
  {
    name: "Jared Bowen",
    initials: "JB",
    isGoingCold: true,
    serviceType: "Replied 5min ago",
    serviceName: "Cremation Services",
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
    serviceName: "Cremation Services",
    message: "Can we Speak tomorrow?",
  },
  {
    name: "Jared Bowen",
    initials: "JB",
    isGoingCold: true,

    serviceType: "Missed 2h ago",
    serviceName: "Cremation Services",
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
