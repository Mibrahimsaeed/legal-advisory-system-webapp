import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/format";

export function UserIdentity({ fullName, email }: { fullName: string; email?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="size-8">
        <AvatarFallback className="bg-muted text-xs font-medium">{getInitials(fullName)}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 leading-tight">
        <span className="truncate font-medium">{fullName}</span>
        {email && <span className="truncate text-xs text-muted-foreground">{email}</span>}
      </div>
    </div>
  );
}
