import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server as HttpServer } from "http"; // Import Server from http and rename it to HttpServer to avoid conflict
import { Server as SocketServer } from "socket.io"; // Import Server from socket.io and rename it to SocketServer
import roomRoutes from "./routes/roomRoute.js"; // Import room routes

dotenv.config();

const app = express();

// Create HTTP server instance
const server = new HttpServer(app);

// Allow cross-origin requests (use environment variable for allowed origins)
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const io = new SocketServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/", roomRoutes); // Attach room routes

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
