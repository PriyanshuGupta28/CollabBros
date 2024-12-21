const Room = require("../models/roomModel");

// Create a new room
const createRoom = async (req, res) => {
  try {
    const roomId = Math.random().toString(36).substring(2, 7); // Generate random roomId
    const newRoom = new Room({
      roomId,
      users: [],
      data: "", // Initial data can be empty or a default value
      createdAt: new Date(),
    });

    await newRoom.save();
    res.status(201).json({ success: true, roomId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update data for a specific room if it exists
const getOrUpdateRoomData = async (req, res) => {
  const { roomId } = req.params;
  // Handle GET request (fetch room data)
  if (req.method === "GET") {
    try {
      const room = await Room.findOne({ roomId });
      if (!room) {
        return res
          .status(404)
          .json({ success: false, message: "Room not found" });
      }

      res.json({ success: true, data: room });
    } catch (error) {
      console.error("Error fetching room data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // Handle PUT request (update room data)
  if (req.method === "PUT") {
    const { data } = req.body;

    try {
      const room = await Room.findOne({ roomId });

      if (!room) {
        return res
          .status(404)
          .json({ success: false, message: "Room not found" });
      }

      // Update the room's data with the new data
      room.data = data;
      await room.save();

      res.json({ success: true, message: "Room data updated successfully" });
    } catch (error) {
      console.error("Error updating room data:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

module.exports = { getOrUpdateRoomData, createRoom };
