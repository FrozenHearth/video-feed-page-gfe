import VideoCard from "./VideoCard";
import { VIDEOS } from "../utils/data";

export default function FeedPage() {
  return (
    <main className="flex min-h-dvh flex-col gap-6 px-4 py-6 sm:px-10">
      {/* Category chips go here */}
      <section className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {VIDEOS.map((video) => (
          <VideoCard key={video.id} videoInfo={video} />
        ))}
      </section>
    </main>
  );
}
