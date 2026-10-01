"use client";

import { useState } from "react";
import { ArrowRightIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubscribeButton() {
  const [notice, setNotice] = useState<string | null>(null);

  // Placeholder until Stripe Checkout is wired up on the backend.
  const handleSubscribe = () => setNotice("Stripe integration coming soon.");

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <Button variant="secondary" onClick={handleSubscribe} className="h-12 w-full gap-2 rounded-xl px-5 text-[15px]">
        Subscribe with Stripe
        <ArrowRightIcon aria-hidden />
      </Button>
      <p role="status" className="flex min-h-5 items-center gap-1.5 text-xs text-primary-foreground/70">
        {notice ?? (
          <>
            <ShieldCheckIcon className="size-3.5" aria-hidden />
            Secure checkout powered by Stripe
          </>
        )}
      </p>
    </div>
  );
}
