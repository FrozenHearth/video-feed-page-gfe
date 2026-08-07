import { relativeDate } from "./relativeDate";

export const CHANNEL = {
  id: "katheryn-interior",
  name: "Katheryn Interior",
  handle: "@katherynterior",
  subscriberCount: 5000000,
  videoCount: 6,
  avatarUrl: "/avatar.png",
};

export const VIDEOS = [
  {
    id: "1",
    thumbnail: {
      src: "/Thumbnail (1).png",
      duration: "12:34",
      altText: "10 Premium Desk Setup Accessories",
    },
    meta: {
      title: "10 Premium Desk Setup Accessories You've Never Heard Of!",
      views: 120000,
      time: relativeDate("2026-03-07"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
  {
    id: "2",
    thumbnail: {
      src: "/Thumbnail (2).png",
      duration: "08:15",
      altText: "Minimalist Home Office Tour",
    },
    meta: {
      title: "Minimalist Home Office Tour 2024",
      views: 45000,
      time: relativeDate("2026-03-04"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
  {
    id: "3",
    thumbnail: {
      src: "/Thumbnail (3).png",
      duration: "15:42",
      altText: "Best Lighting for Your Workspace",
    },
    meta: {
      title: "Best Lighting for Your Workspace",
      views: 890000,
      time: relativeDate("2026-03-01"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
  {
    id: "4",
    thumbnail: {
      src: "/Thumbnail (4).png",
      duration: "06:28",
      altText: "Cable Management Tips",
    },
    meta: {
      title: "Cable Management Tips That Actually Work",
      views: 2100000,
      time: relativeDate("2026-02-22"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
  {
    id: "5",
    thumbnail: {
      src: "/Thumbnail (5).png",
      duration: "22:10",
      altText: "Full Room Makeover",
    },
    meta: {
      title: "Full Room Makeover on a Budget",
      views: 500000,
      time: relativeDate("2026-02-15"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
  {
    id: "6",
    thumbnail: {
      src: "/Thumbnail.png",
      duration: "04:55",
      altText: "Desk Accessories Under $50",
    },
    meta: {
      title: "Desk Accessories Under $50",
      views: 75000,
      time: relativeDate("2026-02-08"),
    },
    userAvatar: {
      src: "/avatar.png",
      altText: "Katheryn Interior",
    },
  },
];
