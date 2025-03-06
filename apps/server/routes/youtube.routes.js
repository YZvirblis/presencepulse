const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// 🟢 Search for a YouTube Channel by Name and Retrieve its Channel ID
router.get("/youtube/search/:query", async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      res.json({
        channelId: channel.id.channelId,
        title: channel.snippet.title,
        thumbnail: channel.snippet.thumbnails.high.url,
      });
    } else {
      res.status(404).json({ error: "Channel not found" });
    }
  } catch (error) {
    console.error("YouTube Search API Error:", error);
    res.status(500).json({ error: "Failed to search YouTube channel" });
  }
});

// 🟢 Fetch YouTube Channel Analytics using Channel ID
router.get("/youtube/channel/:channelId", async (req, res) => {
  const { channelId } = req.params;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      res.json({
        subscribers: stats.subscriberCount ? parseInt(stats.subscriberCount) : 0,
        totalViews: stats.viewCount ? parseInt(stats.viewCount) : 0,
        videoCount: stats.videoCount ? parseInt(stats.videoCount) : 0,
      });
    } else {
      res.status(404).json({ error: "Channel analytics not found" });
    }
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch YouTube data" });
  }
});

module.exports = router;
