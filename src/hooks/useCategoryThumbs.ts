import { useEffect, useState } from "react";

async function fetchThumb(categoryId: string, signal: AbortSignal) {
  const params = new URLSearchParams({
    part: "snippet",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: "1",
    videoCategoryId: categoryId,
  });
  const res = await fetch(`/api/youtube/videos?${params}`, { signal });
  const data = await res.json();
  const video = data.items?.[0];

  return (
    video?.snippet?.thumbnails?.default?.url ??
    video?.snippet?.thumbnails?.medium?.url ??
    ""
  );
}

export default function useCategoryThumbs(categoryIds: string[]) {
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const ids = categoryIds.join(",");

  useEffect(() => {
    if (!ids) return;

    const controller = new AbortController();

    async function fetchThumbs() {
      try {
        const popularRes = await fetch(
          "/api/youtube/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=50",
          { signal: controller.signal },
        );
        const popularData = await popularRes.json();
        const next: Record<string, string> = {};

        for (const video of popularData.items ?? []) {
          const categoryId = video.snippet?.categoryId;
          const src =
            video.snippet?.thumbnails?.default?.url ??
            video.snippet?.thumbnails?.medium?.url;
          if (categoryId && src && !next[categoryId]) {
            next[categoryId] = src;
          }
        }

        const missing = ids.split(",").filter((id) => !next[id]);
        const extras = await Promise.all(
          missing.map(
            async (id) => [id, await fetchThumb(id, controller.signal)] as const,
          ),
        );

        for (const [id, src] of extras) {
          if (src) next[id] = src;
        }

        setThumbs(next);
      } catch (err) {
        if (controller.signal.aborted) return;
      }
    }

    fetchThumbs();

    return () => {
      controller.abort();
    };
  }, [ids]);

  return thumbs;
}
