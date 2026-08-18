import { useEffect, useState } from "react";
import type { YoutubeVideoCategory } from "../types/youtube";

export type FeedCategory = {
  id: string;
  label: string;
};

export default function useCategories() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("loading");
  const [categories, setCategories] = useState<FeedCategory[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      setStatus("loading");
      try {
        const res = await fetch(
          "/api/youtube/videoCategories?part=snippet&regionCode=US",
          { signal: controller.signal },
        );
        const data = await res.json();
        const items: YoutubeVideoCategory[] = data.items ?? [];

        setCategories(
          items
            .filter((item) => item.snippet.assignable)
            .map((item) => ({
              id: item.id,
              label: item.snippet.title,
            })),
        );
        setStatus("idle");
      } catch (err) {
        if (controller.signal.aborted) return;
        setStatus("error");
      }
    }

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return { status, categories };
}
