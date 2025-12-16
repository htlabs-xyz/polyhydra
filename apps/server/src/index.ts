import "dotenv/config";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import express from "express";
import { ExampleRoom } from "./rooms/example-room.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Colyseus Game Server" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

const httpServer = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

gameServer.define("example", ExampleRoom);

const port = parseInt(process.env.PORT || "3001", 10);

gameServer.listen(port).then(() => {
  console.log(`[GameServer] Listening on http://localhost:${port}`);
  console.log(`[GameServer] WebSocket on ws://localhost:${port}`);
});
