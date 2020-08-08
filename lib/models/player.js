import BaseModel from "./base_model";
import { playersById } from "../tempus";

class Player extends BaseModel {
  fetchRecord() {
    return playersById.load(this.attrs.id);
  }

  id() {
    return this.access("id", (r) => r.player_info.id);
  }

  name() {
    return this.access("name", (r) => r.player_info.name);
  }

  country() {
    return this.access("country", (r) => r.player_info.country);
  }

  countryCode() {
    return this.access("country_code", (r) => r.player_info.country_code);
  }

  steamId() {
    return this.access("steamid", (r) => r.player_info.steam_id);
  }

  firstSeen() {
    return this.access("first_seen", (r) => r.player_info.first_seen);
  }

  lastSeen() {
    return this.access("last_seen", (r) => r.player_info.last_seen);
  }
}

export default Player;
