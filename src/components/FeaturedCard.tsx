import { Link } from "react-router";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import "./FeaturedCard.css";
import Avatar from "./Avatar";
import { bigNumberFormatter } from "../utils/bigNumberFormatter";
import { relativeDate } from "../utils/relativeDate";
import { cn } from "../utils/cn";
import type { YoutubeVideo } from "../types/youtube";

export default function FeaturedCard({
  video,
  badge,
  className,
}: {
  video: YoutubeVideo;
  badge: "Popular" | "Trending";
  className?: string;
}) {
  const thumb =
    video.snippet.thumbnails.maxres?.url ??
    video.snippet.thumbnails.high?.url ??
    video.snippet.thumbnails.medium?.url ??
    "";

  return (
    <Link to={`/watch/${video.id}`} className={cn("min-w-0", className)}>
      <article className="featured-container flex flex-col justify-end gap-4 p-4">
        <img
          src={thumb}
          alt=""
          width={1280}
          height={720}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent to-white"
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative z-10 flex w-fit items-center rounded-full border border-solid px-1.5 py-0.5",
            badge === "Popular"
              ? "border-red-200 bg-red-50"
              : "border-yellow-200 bg-yellow-50",
          )}
        >
          <span
            className={cn(
              "text-center text-xs font-normal",
              badge === "Popular" ? "text-red-600" : "text-yellow-700",
            )}
          >
            {badge}
          </span>
        </div>
        <header className="relative z-10 flex flex-col justify-center gap-0.5">
          <span className="text-base font-semibold text-neutral-900">
            {video.snippet.title}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar avatarClassName="w-5 h-5" />
                <span className="text-xs font-medium text-neutral-600">
                  {video.snippet.channelTitle}
                </span>
                <RiVerifiedBadgeFill className="h-4 w-4 text-indigo-700" />
              </div>
              <p className="flex gap-1">
                <span className="text-xs font-normal text-neutral-600">
                  {bigNumberFormatter.format(
                    Number(video.statistics.viewCount),
                  )}{" "}
                  views
                </span>
                <span className="text-xs font-normal text-neutral-600">•</span>
                <span className="text-xs font-normal text-neutral-600">
                  {relativeDate(video.snippet.publishedAt)}
                </span>
              </p>
            </div>
          </div>
        </header>
      </article>
    </Link>
  );
}
