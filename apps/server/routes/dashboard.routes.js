const express = require("express");
const { authenticateUser } = require("../middleware/auth.middleware");
const { PrismaClient } = require("@prisma/client");



const prisma = new PrismaClient();
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

router.post("/consume-token", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { tokens: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.tokens <= 0) {
      return res.status(400).json({ error: "No tokens available" });
    }

    // Deduct token
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { tokens: user.tokens - 1 },
    });

    res.json({ success: true, tokensLeft: updatedUser.tokens });
  } catch (error) {
    console.error("Error consuming token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
