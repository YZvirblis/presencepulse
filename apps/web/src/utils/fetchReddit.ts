export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchRedditData(subreddit: string) {
  if (!subreddit) return null;

  try {
    const res = await fetch(`${API_URL}/reddit/subreddit/${subreddit}`);
    return await res.json();
  } catch (error) {
    console.error("Reddit API Error:", error);
    return null;
  }
}
