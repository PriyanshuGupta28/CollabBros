// /routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const { joinRoom, codeChange } = require("../controllers/roomController"); // Import controller functions

// Example route, can be expanded if you need to provide APIs for room details
router.get("/", (req, res) => {
  res.send("CollabEdit Room Routes");
});

// You can add other routes for handling HTTP requests for room management here
// Example: Get room data
router.get("/:roomName", async (req, res) => {
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

module.exports = router;
