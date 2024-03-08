import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center border border-slate-100 rounded-lg p-2 m-8">
      <Skeleton className="h-44 w-60 rounded-lg" />
      <div className="flex flex-col items-start justify-start w-full my-1">
        <Skeleton className="h-5 w-52 rounded-lg my-1" />
        <Skeleton className="h-5 w-40 rounded-lg my-1" />
      </div>
      <div className="flex flex-col my-1.5">
        <Skeleton className="h-10 w-60 rounded-lg" />
      </div>
    </div>
  );
}
