const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");
const { authenticateUser } = require("../middleware/auth.middleware"); // ✅ Import middleware

const prisma = new PrismaClient();
const router = express.Router();

// 🟢 Get User Profile (Protected)
router.get("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  if (req.user.userId !== id) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🟡 Update User (Protected)
router.put(
  "/:id",
  authenticateUser, // ✅ Require authentication
  [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("name").optional().isString().withMessage("Invalid name"),
  ],
  async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    if (req.user.userId !== id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, name },
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// 🔴 Delete User Account (Protected)
router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  if (req.user.userId !== id) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    await prisma.user.delete({ where: { id } });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
