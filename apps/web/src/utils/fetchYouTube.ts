export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchYouTubeData(channelName: string) {
  if (!channelName) return null;

  try {
    // Search for Channel ID
    const searchRes = await fetch(`${API_URL}/youtube/search/${channelName}`);
    const searchData = await searchRes.json();
    if (!searchData.channelId) return null;

    // Fetch Channel Analytics
    const statsRes = await fetch(`${API_URL}/youtube/channel/${searchData.channelId}`);
    const stats = await statsRes.json();

    return {
      title: searchData.title,
      thumbnail: searchData.thumbnail,
      subscribers: stats.subscribers ?? 0,
      totalViews: stats.totalViews ?? 0,
      videoCount: stats.videoCount ?? 0,
    };
  } catch (error) {
    console.error("YouTube API Error:", error);
    return null;
  }
}
