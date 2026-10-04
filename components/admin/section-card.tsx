import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionCard({ title, description, className, children }: SectionCardProps) {
  return (
    <Card className={cn("rounded-2xl shadow-sm [--card-spacing:--spacing(5)]", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
