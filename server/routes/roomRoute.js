import express from "express"; // Import express
import { Router } from "express"; // Import Router from express
import { joinRoom, codeChange } from "../controllers/roomController.js"; // Import controller functions

const roomRoute = Router(); // Initialize router

// Example route for checking room status
// roomRoute.get("/", (req, res) => {
//   res.send("CollabEdit Room Routes");
// });

// Route to get room details (could be expanded to get room info)
roomRoute.get("/", async (req, res) => {
  try {
    const room = await Room.findOne({ roomName: req.params.roomName });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Export the router as default
export default roomRoute;
