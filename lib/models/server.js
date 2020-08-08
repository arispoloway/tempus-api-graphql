import BaseModel from "./base_model";
import { serversById } from "../tempus";
import Player from "./player";
import Map from "./map";

class Server extends BaseModel {
  fetchRecord() {
    return serversById.load(this.attrs.id);
  }

  id() {
    return this.access("id", (r) => r.id);
  }

  currentMap() {
    return this.access(null, (r) => new Map({ name: r.currentMap }));
  }

  freeDisk() {
    return this.access("freeDisk", (r) => r.freeDisk);
  }

  gameVersion() {
    return this.access("gameVersion", (r) => r.gameVersion);
  }

  hostName() {
    return this.access("hostName", (r) => r.hostName);
  }

  maxPlayers() {
    return this.access("maxPlayers", (r) => r.maxPlayers);
  }

  nextMap() {
    return this.access(null, (r) => new Map({ name: r.nextMap }));
  }

  playerCount() {
    return this.access("playerCount", (r) => r.playerCount);
  }

  players() {
    return this.access(null, (r) => r.users.map((u) => new Player(u)));
  }

  address() {
    return this.access("address", (r) => r.address);
  }

  country() {
    return this.access("country", (r) => r.country);
  }

  hidden() {
    return this.access("hidden", (r) => r.hidden);
  }

  name() {
    return this.access("name", (r) => r.name);
  }

  port() {
    return this.access("port", (r) => r.port);
  }

  shortname() {
    return this.access("shortname", (r) => r.shortname);
  }
}

export default Server;
