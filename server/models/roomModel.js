import mongoose from "mongoose"; // Use import for mongoose

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  users: { type: [String], required: true },
  code: { type: String, default: "" }, // Store the code as a string
});

const Room = mongoose.model("Room", roomSchema);

// Export the Room model
export default Room; // Use export default for the model
