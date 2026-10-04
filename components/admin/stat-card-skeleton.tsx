import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-32 rounded-2xl" />
      ))}
    </>
  );
}
