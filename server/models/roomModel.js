// /models/roomModel.js
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  users: { type: [String], required: true },
  code: { type: String, default: "" }, // Store the code as a string
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
