import BaseModel from "./base_model";
import {
  mapsByName,
  mapsById,
  recordListByMapName,
  recordListByMapId,
  playerRecordByMapName,
  playerRecordByMapId,
} from "../tempus";
import Record from "./record";
import Player from "./player";
import Zone from "./zone";

class Map extends BaseModel {
  fetchRecord() {
    if (this.attrs.name) {
      return mapsByName.load(this.attrs.name);
    }
    return mapsById.load(this.attrs.id);
  }

  id() {
    return this.access("id", (r) => r.map_info.id);
  }

  name() {
    return this.access("name", (r) => r.map_info.name);
  }

  authors() {
    return this.access("authors", (r) =>
      r.authors.map((author) => {
        if (author.player_info) {
          return {
            ...author,
            player: author.player_info && new Player(author.player_info),
          };
        }
        return author;
      })
    );
  }

  videos() {
    return this.access("videos", (r) => r.videos);
  }

  tiers() {
    return this.access("tier_info", (r) => r.tier_info);
  }

  zones() {
    return this.access("zones", (r) => {
      return {
        checkpoint: r.zones.checkpoint.map((zone) => new Zone(zone)),
        linear: r.zones.linear.map((zone) => new Zone(zone)),
        map: r.zones.map.map((zone) => new Zone(zone)),
        mapEnd: r.zones.map_end.map((zone) => new Zone(zone)),
      };
    });
  }

  async records(args) {
    let rs = null;
    if (this.attrs.name) {
      rs = await recordListByMapName.load({
        mapName: this.attrs.name,
        ...args,
      });
    } else {
      rs = await recordListByMapId.load({ mapId: this.attrs.id, ...args });
    }
    const zone = new Zone({ ...rs.zone_info, map: this });
    if (args.class === "soldier") {
      return rs.results.soldier.map(
        (record) => new Record({ ...record, zone, map: this, class: "soldier" })
      );
    }

    return rs.results.demoman.map(
      (record) => new Record({ ...record, zone, map: this, class: "demoman" })
    );
  }

  async record(args) {
    let r = null;
    if (this.attrs.name) {
      r = await playerRecordByMapName.load({
        mapName: this.attrs.name,
        ...args,
      });
    } else {
      r = await playerRecordByMapId.load({ mapId: this.attrs.id, ...args });
    }
    if (!r.result) return null;

    return new Record({
      ...r.result,
      zone_info: r.zone_info,
      player_info: {
        id: r.result.user_id,
        name: r.result.name,
        steamid: r.result.steamid,
      },
      map: this,
      demo_info: {
        id: r.result.demo_id,
        url: r.result.demo_url,
        server_info: {
          id: r.result.demo_server_id,
          name: r.result.demo_server_name,
        },
      },
    });
  }
}

export default Map;
