const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://collabbros.pages.dev"],
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = { users: [], code: "" };
    rooms[room].users.push(username);
    console.log(`User ${username} joined room ${room}`);

    // Send the existing code in the room to the new user
    socket.emit("loadCode", rooms[room].code);

    // Notify others in the room
    socket.to(room).emit("userJoined", username);
  });

  socket.on("codeChange", ({ room, code }) => {
    rooms[room].code = code; // Save the code
    socket.to(room).emit("codeUpdate", code); // Broadcast to others
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Handle room cleanup if needed
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("CollabEdit backend running!");
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
