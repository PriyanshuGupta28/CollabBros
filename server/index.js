const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Use the allowed origins from .env
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle user joining a room
  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = { users: [], code: "" };
    rooms[room].users.push(username);

    // Send live data to everyone in the room
    io.to(room).emit("liveData", {
      message: `User ${username} joined the room!`,
    });

    // Notify others in the room
    socket.to(room).emit("userJoined", username);
  });

  // Handle code changes
  socket.on("codeChange", ({ room, code }) => {
    rooms[room].code = code;
    io.to(room).emit("codeUpdate", code);
    io.to(room).emit("liveData", { message: "Code has been updated!" });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("CollabEdit backend running!");
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
