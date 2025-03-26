export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchRedditData(subreddit: string) {
  if (!subreddit) return null;

  try {
    // ✅ Clean the subreddit name
    const cleanSubreddit = subreddit
      .trim()
      .toLowerCase()
      .replace(/\s/g, '')       // remove all spaces
      .replace(/^r\//, '')      // remove "r/" if present
      .replace(/^u\//, '');     // just in case someone uses "u/"

    // ✅ Fetch subreddit analytics from our backend
    const res = await fetch(`${API_URL}/reddit/subreddit/${cleanSubreddit}`);
    const data = await res.json();

    if (data.error) {
      console.error("Reddit Fetch Error:", data.error);
      return { error: data.error };
    }

    return {
      subreddit: data.subreddit,
      subscribers: data.subscribers ?? 0,
      activeUsers: data.activeUsers ?? 0,
      engagementRate: data.engagementRate ?? "N/A",
    };
  } catch (error) {
    console.error("Reddit API Error:", error);
    return { error: "Failed to fetch Reddit data" };
  }
}
