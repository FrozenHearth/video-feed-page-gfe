import clsx from "clsx";
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
      className={clsx(
        "shrink-0 overflow-hidden rounded-full",
        avatarClassName ?? "h-28 w-28",
        containerClassName,
        !src && "bg-[#8f8d8d]",
      )}
    >
      {src ? (
        <img src={src} alt={altText} className="h-full w-full object-cover" />
      ) : (
        <EmptyAvatar />
      )}
    </div>
  );
}
