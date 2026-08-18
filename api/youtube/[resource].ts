type QueryValue = string | string[] | undefined;

function queryString(query: Record<string, QueryValue>) {
  const params = new URLSearchParams();

  for (const [name, value] of Object.entries(query)) {
    if (name === "resource" || name === "key" || value == null) continue;
    params.set(name, Array.isArray(value) ? value[0] : value);
  }

  return params;
}

export default async function handler(
  req: { method?: string; query: Record<string, QueryValue> },
  res: { status: (code: number) => { json: (body: unknown) => void } },
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "missing YOUTUBE_API_KEY" });
  }

  const resource = req.query.resource;
  const name = Array.isArray(resource) ? resource[0] : resource;
  if (!name || !/^[a-zA-Z]+$/.test(name)) {
    return res.status(400).json({ error: "invalid resource" });
  }

  const params = queryString(req.query);
  params.set("key", key);

  const yt = await fetch(
    `https://www.googleapis.com/youtube/v3/${name}?${params}`,
  );
  return res.status(yt.status).json(await yt.json());
}
