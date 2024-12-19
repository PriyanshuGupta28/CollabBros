import { Server } from "socket.io";
import mongoose from "mongoose";
import Room from "../models/roomModel";

// MongoDB connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async (req, res) => {
  if (req.method === "GET") {
    await connectDB(); // Ensure MongoDB connection

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      // Handle user joining a room
      socket.on("joinRoom", async ({ room, username }) => {
        await joinRoom(socket, room, username);
      });

      // Handle code changes
      socket.on("codeChange", async ({ room, code }) => {
        await codeChange(socket, room, code);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    res.end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

// Room handling logic
const joinRoom = async (socket, room, username) => {
  socket.join(room);
  let roomData = await Room.findOne({ roomName: room });

  if (!roomData) {
    roomData = new Room({ roomName: room, users: [username], code: "" });
    await roomData.save();
  } else {
    roomData.users.push(username);
    await roomData.save();
  }

  socket.emit("codeUpdate", roomData.code);
  socket
    .to(room)
    .emit("liveData", { message: `User ${username} joined the room!` });
  socket.to(room).emit("userJoined", username);
};

const codeChange = async (socket, room, code) => {
  let roomData = await Room.findOne({ roomName: room });

  if (roomData) {
    roomData.code = code;
    await roomData.save();
    socket.to(room).emit("codeUpdate", code);
    socket.to(room).emit("liveData", { message: "Code has been updated!" });
  } else {
    console.error("Room not found");
  }
};
