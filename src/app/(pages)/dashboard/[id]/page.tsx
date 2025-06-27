import LeadDetails from "@/src/views/Lead-Details";

// type Props = {
//   params: {
//     id: string;
//   };
// };

export default function page({ params }: any) {
  return <LeadDetails leadId={params.id} />;
}
