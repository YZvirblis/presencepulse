export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchRedditData(subreddit: string) {
  if (!subreddit) return null;

  try {
    // ✅ Fetch subreddit analytics from our backend
    const res = await fetch(`${API_URL}/reddit/subreddit/${subreddit}`);
    const data = await res.json();

    if (data.error) {
      console.error("Reddit Fetch Error:", data.error);
      return null;
    }

    return {
      subreddit: data.subreddit,
      subscribers: data.subscribers ?? 0,
      activeUsers: data.activeUsers ?? 0,
      engagementRate: data.engagementRate ?? "N/A", // New metric
    };
  } catch (error) {
    console.error("Reddit API Error:", error);
    return null;
  }
}
