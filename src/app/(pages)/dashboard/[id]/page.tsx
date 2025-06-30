import LeadDetails from "@/src/views/Lead-Details";

// type Props = {
//   params: {
//     id: string;
//   };
// };

export default function page({ params, searchParams }: any) {
  return <LeadDetails leadId={params.id} />;
  // return <LeadDetails leadId={params.id} page={searchParams.page} />;
}
