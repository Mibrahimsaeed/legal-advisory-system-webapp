import type { Metadata } from "next";
import { ConsultationView } from "@/components/consultation/consultation-view";

export const metadata: Metadata = { title: "Consultation" };

export default async function ConsultationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ConsultationView consultationId={id} />;
}
