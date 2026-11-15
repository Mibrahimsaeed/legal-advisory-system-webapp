import { CircleCheckIcon } from "lucide-react";

interface AuthNoticeProps {
  title: string;
  children: React.ReactNode;
}

export function AuthNotice({ title, children }: AuthNoticeProps) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-lg border bg-muted/50 p-4 text-sm">
      <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <div className="flex flex-col gap-1">
        <p className="font-medium text-foreground">{title}</p>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
