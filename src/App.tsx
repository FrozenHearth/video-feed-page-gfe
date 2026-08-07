import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import FeedPage from "./components/FeedPage.tsx";
import VideoDetailPlaceholder from "./components/VideoDetailPlaceholder.tsx";
import ChannelPlaceholder from "./components/ChannelPlaceholder.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/watch/:videoId" element={<VideoDetailPlaceholder />} />
        <Route path="/channel/*" element={<ChannelPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
