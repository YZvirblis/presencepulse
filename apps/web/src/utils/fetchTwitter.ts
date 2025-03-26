export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchTwitterData(username: string) {
  if (!username) return null;

  try {
    const res = await fetch(`${API_URL}/twitter/user/${username}`);
    
    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || "Unknown Twitter error" };
    }

    const userData = await res.json();
    console.log(userData);

    return {
      username: userData.username,
      followers: userData.followers,
      tweetCount: userData.tweetCount,
      engagementRate: userData.engagementRate,
      totalLikes: userData.engagement?.likes ?? 0,
      totalRetweets: userData.engagement?.retweets ?? 0,
      totalReplies: userData.engagement?.replies ?? 0,
    };
  } catch (error) {
    console.error("Twitter API Error:", error);
    return { error: "Twitter request failed" };
  }
}
