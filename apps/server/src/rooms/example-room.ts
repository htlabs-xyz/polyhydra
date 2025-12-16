import { Room, Client } from "@colyseus/core";
import { Schema, type, MapSchema } from "@colyseus/schema";

class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
}

class RoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
}

export class ExampleRoom extends Room<RoomState> {
  maxClients = 4;

  onCreate() {
    this.setState(new RoomState());

    this.onMessage("move", (client, data: { x: number; y: number }) => {
      const player = this.state.players.get(client.sessionId);
      if (player) {
        player.x = data.x;
        player.y = data.y;
      }
    });
  }

  onJoin(client: Client) {
    console.log(`[ExampleRoom] ${client.sessionId} joined`);
    const player = new Player();
    this.state.players.set(client.sessionId, player);
  }

  onLeave(client: Client) {
    console.log(`[ExampleRoom] ${client.sessionId} left`);
    this.state.players.delete(client.sessionId);
  }

  onDispose() {
    console.log("[ExampleRoom] Disposing room");
  }
}
