import { Link } from "react-router";

export default function ChannelPlaceholder() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-16">
      <h1 className="font-semibold text-xl text-neutral-900">
        Channel page (Video Channel challenge)
      </h1>
      <p className="font-normal text-base text-neutral-600">
        Placeholder — build this in the Video Channel project / MeTube.
      </p>
      <Link
        to="/"
        className="font-medium text-sm text-indigo-700 hover:underline"
      >
        Back to feed
      </Link>
    </main>
  );
}
