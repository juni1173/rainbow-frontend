import LeadDetails from "@/views/Lead-Details";
import React from "react";

const LeadDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return <LeadDetails leadId={id} />;
};

export default LeadDetailsPage;
