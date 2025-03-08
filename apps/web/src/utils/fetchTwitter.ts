export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchTwitterData(username: string) {
  if (!username) return null;

  try {
    const res = await fetch(`${API_URL}/twitter/user/${username}`);
    const userData = await res.json();
    
    if (!userData || !userData.followers) return null;

    // Fetch recent tweets to calculate engagement
    const tweetsRes = await fetch(`${API_URL}/twitter/tweets/${username}`);
    const tweetsData = await tweetsRes.json();

    const totalEngagement = tweetsData.tweets.reduce(
      (sum: number, tweet: any) => sum + tweet.likes + tweet.retweets,
      0
    );

    // ✅ Calculate Engagement Rate
    const engagementRate = userData.followers
      ? ((totalEngagement / userData.followers) * 100).toFixed(2) + "%"
      : "N/A";

    return {
      username: userData.username,
      followers: userData.followers,
      engagementRate,
    };
  } catch (error) {
    console.error("Twitter API Error:", error);
    return null;
  }
}
