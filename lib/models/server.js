import BaseModel from "./base_model";
import Player from "./player";
import Map from "./map";
import Demo from "./demo";

class Server extends BaseModel {
  fetchRecord() {
    return this._context.tempus.serversById.load(this.attrs.id);
  }

  id() {
    return this.access("id", (r) => r.id);
  }

  currentMap() {
    return this.access(
      null,
      (r) => r.currentMap && new Map(this._context, { name: r.currentMap })
    );
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
    return this.access(
      null,
      (r) => r.nextMap && new Map(this._context, { name: r.nextMap })
    );
  }

  playerCount() {
    return this.access("playerCount", (r) => r.playerCount);
  }

  players() {
    return this.access(
      null,
      (r) => r.users && r.users.map((u) => new Player(this._context, u))
    );
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

  online() {
    return this.access("online", (r) => !!r.gameVersion);
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

  async demos() {
    const demos = await this._context.tempus.serverDemosById.load(
      this.attrs.id
    );
    return demos.map((demo) => new Demo(this._context, demo));
  }
}

export default Server;
