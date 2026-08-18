export type YoutubeThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type YoutubeVideo = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: YoutubeThumbnail;
      medium?: YoutubeThumbnail;
      high?: YoutubeThumbnail;
      standard?: YoutubeThumbnail;
      maxres?: YoutubeThumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: string[];
      blocked?: string[];
    };
    contentRating: Record<string, unknown>;
    projection: string;
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    favoriteCount: string;
    commentCount?: string;
  };
};

export type YoutubeVideoListResponse = {
  kind: "youtube#videoListResponse";
  etag: string;
  items: YoutubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type YoutubeVideoCategory = {
  kind: "youtube#videoCategory";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    title: string;
    assignable: boolean;
  };
};
