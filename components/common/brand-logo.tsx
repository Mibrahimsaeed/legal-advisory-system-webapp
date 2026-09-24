import { ScaleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants/app";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-heading font-semibold", className)}>
      <ScaleIcon className="size-5" />
      <span>{APP_NAME}</span>
    </div>
  );
}
