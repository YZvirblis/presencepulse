const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_USER_AGENT = process.env.TWITTER_USER_AGENT;

// 🟢 Fetch Twitter User Data
router.get("/twitter/user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`, {
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        "User-Agent": TWITTER_USER_AGENT,
      },
    });

    const data = await response.json();
    if (data.data) {
      res.json({
        username: data.data.username,
        followers: data.data.public_metrics.followers_count,
        tweetCount: data.data.public_metrics.tweet_count,
      });
    } else {
      res.status(404).json({ error: "Twitter user not found" });
    }
  } catch (error) {
    console.error("Twitter API Error:", error);
    res.status(500).json({ error: "Failed to fetch Twitter data" });
  }
});

module.exports = router;
