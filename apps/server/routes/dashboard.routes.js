const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");

const router = express.Router();

// Mocked Engagement Data (Replace this with real API integrations later)
const getMockAnalytics = (userId) => {
  return {
    userId,
    followers: Math.floor(Math.random() * 10000), // Random followers
    likes: Math.floor(Math.random() * 5000), // Random likes
    views: Math.floor(Math.random() * 20000), // Random views
    engagementRate: (Math.random() * 10).toFixed(2) + "%",
    growth: {
      weekly: (Math.random() * 5).toFixed(2) + "%",
      monthly: (Math.random() * 15).toFixed(2) + "%",
    },
  };
};

// 🟢 Get User Analytics (Protected)
router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const analytics = getMockAnalytics(userId);

    res.json(analytics);
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
