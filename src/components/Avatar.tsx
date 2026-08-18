import { cn } from "../utils/cn";
import EmptyAvatar from "./EmptyAvatar";

export default function Avatar({
  avatarClassName,
  containerClassName,
  src,
  altText,
}: {
  avatarClassName?: string;
  containerClassName?: string;
  src?: string;
  altText?: string;
}) {
  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden rounded-full",
        avatarClassName ?? "h-28 w-28",
        containerClassName,
        !src && "bg-[#8f8d8d]",
      )}
    >
      {src ? (
        <img
          src={src}
          alt={altText}
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <EmptyAvatar />
      )}
    </div>
  );
}
