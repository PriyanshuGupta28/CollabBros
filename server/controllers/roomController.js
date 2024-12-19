import Room from "../models/roomModel.js"; // Correct import for Room model

// Room handling logic
const joinRoom = async (socket, room, username) => {
  socket.join(room);

  // Find or create the room in MongoDB
  let roomData = await Room.findOne({ roomName: room });

  if (!roomData) {
    // If room doesn't exist, create it
    roomData = new Room({ roomName: room, users: [username], code: "" });
    await roomData.save();
  } else {
    // If room exists, add user to the room
    roomData.users.push(username);
    await roomData.save();
  }

  // Send the current code to the user who joined the room
  socket.emit("codeUpdate", roomData.code);

  // Send live data to everyone in the room
  socket.to(room).emit("liveData", {
    message: `User ${username} joined the room!`,
  });

  // Notify others in the room
  socket.to(room).emit("userJoined", username);
};

const codeChange = async (socket, room, code) => {
  // Update the room's code in MongoDB
  let roomData = await Room.findOne({ roomName: room });

  if (roomData) {
    roomData.code = code; // Update the code
    await roomData.save(); // Save the updated code to MongoDB

    // Broadcast the updated code to everyone in the room
    socket.to(room).emit("codeUpdate", code);
    socket.to(room).emit("liveData", { message: "Code has been updated!" });
  } else {
    console.error("Room not found");
  }
};

// Export controller methods
export { joinRoom, codeChange }; // Export functions using ES6 syntax
