const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_USER_AGENT = process.env.TWITTER_USER_AGENT;

// 🟢 Fetch Twitter User Data
router.get("/twitter/user/:username", async (req, res) => {
  let { username } = req.params;
  username = username.trim(" ").toLowerCase().replace(/\s/g, '');
  try {
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
          "User-Agent": TWITTER_USER_AGENT,
        },
      }
    );

    const data = await response.json();
    if(data.status === 429) return res.status(429).json({ error: "Rate limit exceeded" });
    if (!data.data) return res.status(404).json({ error: "Twitter user not found" });

    const userId = data.data.id;
    const followers = data.data.public_metrics.followers_count;
    const tweetCount = data.data.public_metrics.tweet_count;

    // ✅ Fetch Recent Tweets for Engagement Data
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=public_metrics&max_results=10`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
          "User-Agent": TWITTER_USER_AGENT,
        },
      }
    );

    const tweetsData = await tweetsResponse.json();

    if(tweetsResponse.status === 429) return res.status(429).json({ error: "Rate limit exceeded" });
    if (!tweetsData.data) return res.status(404).json({ error: "No tweets found" });

    // ✅ Calculate Total Engagement
    let totalLikes = 0;
    let totalRetweets = 0;
    let totalReplies = 0;

    tweetsData.data.forEach((tweet) => {
      totalLikes += tweet.public_metrics.like_count;
      totalRetweets += tweet.public_metrics.retweet_count;
      totalReplies += tweet.public_metrics.reply_count;
    });

    // ✅ Calculate Engagement Rate
    const totalEngagement = totalLikes + totalRetweets + totalReplies;
    const engagementRate = followers > 0 ? ((totalEngagement / followers) * 100).toFixed(2) + "%" : "N/A";

    res.json({
      platform: "twitter",
      username: data.data.username,
      followers,
      tweetCount,
      engagementRate,
      engagement: {
        likes: totalLikes,
        retweets: totalRetweets,
        replies: totalReplies
      }
    });
  } catch (error) {
    console.error("Twitter API Error:", error);
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
});

module.exports = router;
