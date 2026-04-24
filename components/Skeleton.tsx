// src/components/ui/Skeleton.tsx
import { ReactNode } from "react";

type Props = {
  className?: string;
  height?: string | number;
  width?: string | number;
};

export function Skeleton({ className = "", height, width }: Props) {
  return (
    <div
      className={`skeleton rounded-sm ${className}`}
      style={{ height, width }}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#171717] p-5 space-y-4 ${className}`}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonTableRow({
  cols = 4,
  className = "",
}: {
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-6 py-4 border-b border-[#272727] items-center ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4" width={i === 0 ? "40px" : "80%"} />
      ))}
    </div>
  );
}

export default Skeleton;
