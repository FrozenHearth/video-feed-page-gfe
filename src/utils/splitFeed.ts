import type { YoutubeVideo } from "../types/youtube";

export function splitFeed(videos: YoutubeVideo[]) {
  if (videos.length === 0) {
    return { popular: null, trending: null, rest: [] };
  }

  const popular = [...videos].sort(
    (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount),
  )[0];

  const trending =
    [...videos]
      .filter((video) => video.id !== popular.id)
      .sort(
        (a, b) =>
          Date.parse(b.snippet.publishedAt) - Date.parse(a.snippet.publishedAt),
      )[0] ?? null;

  const used = new Set([popular.id, trending?.id]);
  const rest = videos.filter((video) => !used.has(video.id));

  return { popular, trending, rest };
}
