const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const REDDIT_USER_AGENT = process.env.REDDIT_USER_AGENT;

// 🟢 Get Reddit Access Token
async function getRedditToken() {
  try {
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": REDDIT_USER_AGENT,
      },
      body: `grant_type=password&username=${REDDIT_USERNAME}&password=${REDDIT_PASSWORD}`,
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Reddit Token Error:", error);
    return null;
  }
}

// 🟢 Fetch Reddit Subreddit Analytics
router.get("/reddit/subreddit/:subreddit", async (req, res) => {
  const { subreddit } = req.params;
  try {
    const token = await getRedditToken();
    if (!token) return res.status(500).json({ error: "Failed to authenticate with Reddit API" });

    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/about`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": REDDIT_USER_AGENT,
      },
    });

    const data = await response.json();
    if (data && data.data) {
      res.json({
        subreddit: data.data.display_name_prefixed,
        subscribers: data.data.subscribers,
        activeUsers: data.data.accounts_active,
      });
    } else {
      res.status(404).json({ error: "Subreddit not found" });
    }
  } catch (error) {
    console.error("Reddit API Error:", error);
    res.status(500).json({ error: "Failed to fetch subreddit data" });
  }
});

module.exports = router;
