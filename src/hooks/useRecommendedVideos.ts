import { useEffect, useState } from "react";
import type { YoutubeVideo } from "../types/youtube";
import { DISCOVER_CATEGORY_ID } from "../utils/feedCategories";

export default function useRecommendedVideos(categoryId: string) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [recommendedVideos, setRecommendedVideos] = useState<YoutubeVideo[]>(
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecommendedVideos() {
      setStatus("loading");
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
        setRecommendedVideos(data.items ?? []);
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

  return { status, recommendedVideos };
}
