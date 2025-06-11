// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Express ve HTTP sunucusu oluştur
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "*", // Gerekirse belirli domain ile sınırla
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  socket.on("message", (msg) => {
    console.log(`Received message: ${msg}`);
    io.emit("message", msg); // Gönderen dahil herkese gönder
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Sunucuyu başlat
server.listen(8080, () => {
  console.log("Socket.IO server listening on port 8080");
});
