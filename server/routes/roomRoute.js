const express = require("express");
const router = express.Router();
const {
  getOrUpdateRoomData,
  createRoom,
} = require("../controllers/roomController");

// Route to get or update room data based on HTTP method
router
  .route("/rooms/:roomId")
  .get(getOrUpdateRoomData) // To fetch room data
  .put(getOrUpdateRoomData); // To update room data

// Route to create a new room
router.post("/rooms", createRoom);

module.exports = router;
