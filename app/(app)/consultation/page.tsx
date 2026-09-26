import type { Metadata } from "next";
import { ConsultationView } from "@/components/consultation/consultation-view";

export const metadata: Metadata = { title: "New Consultation" };

export default function NewConsultationPage() {
  return <ConsultationView consultationId={null} />;
}
