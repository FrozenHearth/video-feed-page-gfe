import { Link, useParams } from "react-router";

export default function VideoDetailPlaceholder() {
  const { videoId } = useParams();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-16">
      <h1 className="font-semibold text-xl text-neutral-900">
        Video detail MeTube challenge
      </h1>
      <p className="font-normal text-base text-neutral-600">
        Placeholder for video {videoId}
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
