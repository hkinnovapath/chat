// Set up an Express server and integrate Socket.io:


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for chat messages
  socket.on('chatMessage', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chatMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});