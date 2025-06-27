type Props = {
  params: {
    id: string;
  };
};

export default function LeadDetailsPage({ params }: Props) {
  return <LeadDetails leadId={params.id} />;
}
