import clsx from "clsx";
import { Link } from "react-router";
import { CHANNEL } from "../utils/data";
import { bigNumberFormatter } from "../utils/bigNumberFormatter";

export default function VideoCard({
  videoInfo,
}: {
  videoInfo: {
    id: string;
    thumbnail: {
      src: string;
      duration: string;
      altText?: string;
      className?: string;
      durationClassName?: string;
      durationTextClassName?: string;
    };
    meta: {
      title: string;
      views: number;
      time: string;
      className?: string;
      titleClassName?: string;
      statsClassName?: string;
    };
    userAvatar: {
      src: string;
      altText?: string;
      className?: string;
    };
  };
}) {
  const videoUrl = `/watch/${videoInfo.id}`;
  const channelUrl = "/channel/videos";
  const creatorName = videoInfo.userAvatar.altText ?? CHANNEL.name;

  return (
    <article className="group flex flex-col gap-3">
      <Link to={videoUrl} className="cursor-pointer">
        <figure
          className={clsx(
            "relative m-0 h-48 flex flex-col justify-end items-end pr-1 pb-1 rounded-lg overflow-hidden",
            videoInfo.thumbnail.className,
          )}
        >
          <img
            src={videoInfo.thumbnail.src}
            alt={videoInfo.thumbnail.altText}
            className="absolute inset-0 h-full w-full object-cover rounded-lg"
          />
          <div
            className={clsx(
              "relative flex justify-center items-center bg-neutral-950 px-1 py-0.5 rounded",
              videoInfo.thumbnail.durationClassName,
            )}
          >
            <span
              className={clsx(
                "font-normal text-xs text-white",
                videoInfo.thumbnail.durationTextClassName,
              )}
            >
              {videoInfo.thumbnail.duration}
            </span>
          </div>
        </figure>
      </Link>
      <div
        className={clsx("flex gap-2 self-stretch", videoInfo.meta.className)}
      >
        <Link
          to={channelUrl}
          className="shrink-0"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            src={videoInfo.userAvatar.src}
            alt=""
            className={clsx(
              "h-9 w-9 rounded-full object-cover",
              videoInfo.userAvatar.className,
            )}
          />
        </Link>
        <div className="flex min-w-0 flex-col gap-2 grow">
          <Link to={videoUrl} className="cursor-pointer">
            <span
              className={clsx(
                "font-medium text-sm text-neutral-900 group-hover:font-semibold",
                videoInfo.meta.titleClassName,
              )}
            >
              {videoInfo.meta.title}
            </span>
          </Link>
          <Link to={videoUrl} className="cursor-pointer">
            <div
              className={clsx(
                "flex gap-1 self-stretch",
                videoInfo.meta.statsClassName,
              )}
            >
              <span className="font-normal text-xs text-neutral-600">
                {bigNumberFormatter.format(videoInfo.meta.views)} views
              </span>
              <span className="font-normal text-xs text-neutral-600">•</span>
              <span className="font-normal text-xs text-neutral-600">
                {videoInfo.meta.time}
              </span>
            </div>
          </Link>
          <Link
            to={channelUrl}
            className="w-fit font-normal text-xs text-neutral-600 hover:text-neutral-900"
            onClick={(event) => event.stopPropagation()}
          >
            {creatorName}
          </Link>
        </div>
      </div>
    </article>
  );
}
