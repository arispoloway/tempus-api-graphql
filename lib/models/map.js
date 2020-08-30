import BaseModel from "./base_model";
import {
  mapsByName,
  mapsById,
  recordListByMapName,
  recordListByMapId,
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
          return { ...author, player: new Player(author.player_info) };
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
    const zone = new Zone(rs.zone_info);
    return {
      zone,
      tiers: rs.tier_info,
      soldier: rs.results.soldier.map(
        (record) => new Record({ ...record, zone, class: "soldier" })
      ),
      demoman: rs.results.demoman.map(
        (record) => new Record({ ...record, zone, class: "demoman" })
      ),
    };
  }
}

export default Map;
