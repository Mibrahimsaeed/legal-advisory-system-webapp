import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AdminPageProps {
  title: string;
  description: string;
  sampleData?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function AdminPage({ title, description, sampleData = false, className, children }: AdminPageProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3 sm:px-6">
        <SidebarTrigger className="-ml-1" />
        <h1 className="min-w-0 flex-1 truncate font-heading text-2xl font-semibold">{title}</h1>
        {sampleData && (
          <Badge variant="outline" title="Values on this page are sample data for demonstration.">
            Sample data
          </Badge>
        )}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className={cn("mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8", className)}>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
