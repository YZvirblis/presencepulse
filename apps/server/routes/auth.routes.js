const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"; 

// 🟢 Register Route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      // Generate JWT Token
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// 🟡 Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Generate JWT Token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
