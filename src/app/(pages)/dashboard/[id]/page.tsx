import LeadDetails from "@/views/Lead-Details";
import React from "react";
// import { PageProps } from "next";
type PageProps = {
  params: { id: string };
};
// const LeadDetailsPage = ({ params }: { params: { id: string } }) => {
export default function LeadDetailsPage({
  params,
}: PageProps & { params: { id: string } }) {
  const { id } = params;

  return <LeadDetails leadId={id} />;
}
