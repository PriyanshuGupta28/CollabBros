const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const roomRouter = require("./routes/roomRoute");
const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
// CORS setup - Using the same CORS configuration for both Express and Socket.IO
const corsOptions = {
  origin: ALLOWED_ORIGINS,
  methods: ["GET", "PUT"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware for parsing JSON
app.use(express.json());

// Use room routes
app.use("/api", roomRouter);

// Socket.IO setup
const io = socketIo(server, {
  cors: corsOptions, // Reusing the same CORS options for Socket.IO
});

// Handle socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", ({ roomId }) => {
    console.log(`User joined room ${roomId}`);
    socket.join(roomId);

    // Broadcast when a user joins the room
    socket.to(roomId).emit("userJoined", `has joined the room.`);
  });

  // Handle code changes in the room
  socket.on("codeChange", ({ roomId, code }) => {
    // Emit the code to everyone in the room
    socket.to(roomId).emit("codeUpdate", code);
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error(
    "MongoDB URI is undefined. Please set the MONGODB_URI in your .env file."
  );
  process.exit(1); // Exit the app if the URI is not set
}

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit if the MongoDB connection fails
  });

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
