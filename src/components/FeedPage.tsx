import { useState } from "react";
import VideoCard from "./VideoCard";
import FeaturedCard from "./FeaturedCard";
import CategoryChips from "./CategoryChips";
import FeedPageSkeleton from "./FeedPageSkeleton";
import useRecommendedVideos from "../hooks/useRecommendedVideos";
import useCategories from "../hooks/useCategories";
import useCategoryThumbs from "../hooks/useCategoryThumbs";
import { relativeDate } from "../utils/relativeDate";
import { formatDuration } from "../utils/formatDuration";
import { splitFeed } from "../utils/splitFeed";
import { DISCOVER_CATEGORY_ID } from "../utils/feedCategories";
import type { YoutubeVideo } from "../types/youtube";

function toVideoCardInfo(video: YoutubeVideo) {
  return {
    id: video.id,
    thumbnail: {
      src:
        video.snippet.thumbnails.medium?.url ??
        video.snippet.thumbnails.default?.url ??
        "",
      duration: formatDuration(video.contentDetails.duration),
      altText: video.snippet.title,
    },
    meta: {
      title: video.snippet.title,
      views: Number(video.statistics.viewCount),
      time: relativeDate(video.snippet.publishedAt),
    },
    userAvatar: {
      src: "/avatar-empty.svg",
      altText: video.snippet.channelTitle,
    },
  };
}

export default function FeedPage() {
  const [categoryId, setCategoryId] = useState(DISCOVER_CATEGORY_ID);
  const { categories } = useCategories();
  const { status, recommendedVideos } = useRecommendedVideos(categoryId);
  const thumbs = useCategoryThumbs(categories.map((category) => category.id));
  const { popular, trending, rest } = splitFeed(recommendedVideos);

  return (
    <main className="layout-grid min-h-dvh gap-y-6 py-12">
      <div className="col-span-full">
        <CategoryChips
          categories={categories}
          selectedId={categoryId}
          thumbs={thumbs}
          onSelect={setCategoryId}
        />
      </div>
      {status === "loading" ? (
        <div className="col-span-full">
          <FeedPageSkeleton />
        </div>
      ) : status === "error" ? (
        <section className="col-span-full flex flex-col gap-2 py-16 text-center">
          <h1 className="text-xl font-semibold text-neutral-900">
            Unexpected error
          </h1>
          <p className="text-base font-normal text-neutral-600">
            We're facing some issues at the moment. Please try again later or
            contact support.
          </p>
        </section>
      ) : (
        <>
          <header className="relative col-span-full">
            <div className="featured-row">
              {popular ? (
                <FeaturedCard video={popular} badge="Popular" />
              ) : null}
              {trending ? (
                <FeaturedCard video={trending} badge="Trending" />
              ) : null}
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-linear-to-l from-white to-transparent min-[1440px]:hidden"
              aria-hidden="true"
            />
          </header>
          <section className="col-span-full grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {rest.map((video) => (
              <VideoCard key={video.id} videoInfo={toVideoCardInfo(video)} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
