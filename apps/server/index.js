require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/auth.routes");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // ✅ Authentication Routes

app.get("/", async (req, res) => {
  res.send("PresencePulse API is running!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
