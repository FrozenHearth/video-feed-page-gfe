import Skeleton from "./Skeleton";

export default function VideoCardSkeleton() {
  return (
    <article className="flex flex-col gap-3" aria-hidden="true">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <div className="flex min-w-0 grow flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
    </article>
  );
}
