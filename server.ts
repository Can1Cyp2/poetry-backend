import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user"; // Import user routes
import poetryRoutes from "./routes/poetry"; // Import poetry routes
import translationRoutes from "./routes/translation"; // Import translation routes

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Configure CORS with specific origins
const corsOptions = {
  origin: ["https://paulospoetry.com", "http://localhost:3000"], // Allow your domains
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};
app.use(cors(corsOptions)); // Apply CORS middleware

// Mount the routes with path prefixes
app.use("/users", userRoutes);
app.use("/poetry", poetryRoutes);
app.use("/translations", translationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
mongoose.connection.once("open", () => {
  console.log("MongoDB connection is open");
  console.log(mongoose.connection.db?.databaseName);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
