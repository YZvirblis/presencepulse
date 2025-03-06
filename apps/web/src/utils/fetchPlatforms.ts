import { fetchYouTubeData } from "./fetchYouTube";
import { fetchInstagramData } from "./fetchInstagram";
import { fetchRedditData } from "./fetchReddit";
import { fetchTwitterData } from "./fetchTwitter";

export async function fetchAllPlatformData(handles: { youtube: string; instagram: string; reddit: string; twitter: string }) {
  const [youtubeData, instagramData, redditData, twitterData] = await Promise.all([
    fetchYouTubeData(handles.youtube),
    fetchInstagramData(handles.instagram),
    fetchRedditData(handles.reddit),
    fetchTwitterData(handles.twitter),
  ]);

  return {
    youtube: youtubeData,
    instagram: instagramData,
    reddit: redditData,
    twitter: twitterData,
  };
}
