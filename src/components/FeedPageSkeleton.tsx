import VideoCardSkeleton from "./VideoCardSkeleton";

export default function FeedPageSkeleton({ count = 12 }: { count?: number }) {
  return (
    <section
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading videos"
    >
      {Array.from({ length: count }, (_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </section>
  );
}
