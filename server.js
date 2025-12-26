import Fastify from 'fastify';
import cors from '@fastify/cors';
import { Server } from 'socket.io';
import http from 'http';
import sqlite3 from 'sqlite3';

const fastify = Fastify();
await fastify.register(cors, { origin: '*' });

// DB setup
const db = new sqlite3.Database('./tracker.db');
db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    startTime INTEGER,
    lastPing INTEGER,
    timeSpent INTEGER
)`);

// HTTP server + Socket.io
const server = http.createServer(fastify.server);
const io = new Server(server, { cors: { origin: '*' } });

const users = {}; // memory storage

io.on('connection', socket => {
  console.log('User connected', socket.id);

  // When user starts work
  socket.on('start', user => {
    if (!users[user]) {
      const now = Date.now();
      users[user] = { startTime: now, lastPing: now, timeSpent: 0 };
    }
    socket.user = user;
  });

  // Heartbeat ping every few sec
  socket.on('ping', () => {
    const user = socket.user;
    if (!user) return;
    const now = Date.now();
    users[user].timeSpent += now - users[user].lastPing;
    users[user].lastPing = now;
  });

  // Disconnect → user offline
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.user);
  });
});

// Reset timer at 12 AM
setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0) {
    for (const u in users) {
      users[u].timeSpent = 0;
      users[u].startTime = Date.now();
    }
  }
}, 60000);

server.listen(3001, () => console.log('Server running on 3001'));
