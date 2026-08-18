import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const key = process.env.YOUTUBE_API_KEY;
const port = Number(process.env.PORT) || 3001;

app.use(cors());

app.get("/api/youtube/:resource", async (req, res) => {
  if (!key) {
    return res.status(500).json({ error: "missing YOUTUBE_API_KEY" });
  }

  const qs = new URLSearchParams(req.query as Record<string, string>);
  qs.set("key", key);

  const url = `https://www.googleapis.com/youtube/v3/${req.params.resource}?${qs}`;
  console.log("hit url", url);
  const yt = await fetch(url);
  res.status(yt.status).json(await yt.json());
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
