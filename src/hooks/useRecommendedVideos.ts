import { useEffect, useState } from "react";
import type { YoutubeVideo } from "../types/youtube";
import { DISCOVER_CATEGORY_ID } from "../utils/feedCategories";

export default function useRecommendedVideos(categoryId: string) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [recommendedVideos, setRecommendedVideos] = useState<YoutubeVideo[]>(
    [],
  );
  const [channelAvatars, setChannelAvatars] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecommendedVideos() {
      setStatus("loading");
      setChannelAvatars({});
      try {
        const params = new URLSearchParams({
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "US",
          maxResults: "12",
        });

        if (categoryId !== DISCOVER_CATEGORY_ID) {
          params.set("videoCategoryId", categoryId);
        }

        const res = await fetch(`/api/youtube/videos?${params}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        const items: YoutubeVideo[] = data.items ?? [];
        const channelIds = [
          ...new Set(items.map((video) => video.snippet.channelId)),
        ].join(",");

        if (channelIds) {
          const channelsRes = await fetch(
            `/api/youtube/channels?part=snippet&id=${channelIds}`,
            { signal: controller.signal },
          );
          const channelsData = await channelsRes.json();
          const avatars: Record<string, string> = {};

          for (const channel of channelsData.items ?? []) {
            avatars[channel.id] =
              channel.snippet?.thumbnails?.default?.url ??
              channel.snippet?.thumbnails?.medium?.url ??
              "";
          }

          setChannelAvatars(avatars);
        }

        setRecommendedVideos(items);
        setStatus(res.ok ? "idle" : "error");
      } catch (err) {
        if (controller.signal.aborted) return;
        setStatus("error");
      }
    }

    fetchRecommendedVideos();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  return { status, recommendedVideos, channelAvatars };
}
