import type { Metadata } from "next";
import { ConsultationView } from "@/components/consultation/consultation-view";

export const metadata: Metadata = { title: "New Consultation" };

export default async function NewConsultationPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  return <ConsultationView key={type ?? "new"} consultationId={null} archetypeId={type ?? null} />;
}
