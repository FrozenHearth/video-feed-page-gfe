import { RiCompass3Fill } from "react-icons/ri";
import { cn } from "../utils/cn";
import { DISCOVER_CATEGORY_ID } from "../utils/feedCategories";
import Avatar from "./Avatar";
import type { FeedCategory } from "../hooks/useCategories";

const chipClass =
  "flex shrink-0 cursor-pointer items-center gap-3 rounded-full bg-neutral-50 pt-1 pr-3 pb-1 pl-1 text-base font-medium text-neutral-600";

const chipActiveClass = "bg-indigo-50 font-semibold text-neutral-900";

export default function CategoryChips({
  categories,
  selectedId,
  thumbs,
  onSelect,
}: {
  categories: FeedCategory[];
  selectedId: string;
  thumbs: Record<string, string>;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative">
      <nav
        className="flex gap-3 overflow-x-auto pr-28 scrollbar-none [&::-webkit-scrollbar]:hidden"
        aria-label="Video categories"
      >
        <button
          type="button"
          onClick={() => onSelect(DISCOVER_CATEGORY_ID)}
          className={cn(
            chipClass,
            selectedId === DISCOVER_CATEGORY_ID && chipActiveClass,
          )}
        >
          <span className="flex cursor-pointer items-center justify-center rounded-full">
            <RiCompass3Fill className="h-10 w-10 text-indigo-700" />
          </span>
          <span>Discover</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={cn(
              chipClass,
              selectedId === category.id && chipActiveClass,
            )}
          >
            <Avatar src={thumbs[category.id]} avatarClassName="h-10 w-10" />
            <span>{category.label}</span>
          </button>
        ))}
      </nav>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 h-16 w-28 bg-linear-to-l from-white to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
