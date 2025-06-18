// import LeadDetails from "@/views/Lead-Details";
// import React from "react";
// // import { PageProps } from "next";
// type PageProps = {
//   params: { id: string };
// };
// // const LeadDetailsPage = ({ params }: { params: { id: string } }) => {
// export default function LeadDetailsPage({
//   params,
// }: PageProps & { params: { id: string } }) {
//   const { id } = params;

//   return <LeadDetails leadId={id} />;
// }
// app/dashboard/[id]/page.tsx or similar path

// app/dashboard/[id]/page.tsx
import LeadDetails from "@/views/Lead-Details";

export default function LeadDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <LeadDetails leadId={params.id} />;
}
