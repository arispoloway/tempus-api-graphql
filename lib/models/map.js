import BaseModel from "./base_model";
import Record from "./record";
import Player from "./player";
import Zone from "./zone";

class Map extends BaseModel {
  fetchRecord() {
    if (this.attrs.name) {
      return this.context.tempus.mapsByName.load(this.attrs.name);
    }
    return this.context.tempus.mapsById.load(this.attrs.id);
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
            player:
              author.player_info &&
              new Player(this.context, author.player_info),
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
        bonus: (r.zones.bonus || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        bonusEnd: (r.zones.bonus_end || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        checkpoint: (r.zones.checkpoint || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        course: (r.zones.course || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        courseEnd: (r.zones.course_end || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        linear: (r.zones.linear || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        map: (r.zones.map || []).map((zone) => new Zone(this.context, zone)),
        mapEnd: (r.zones.map_end || []).map(
          (zone) => new Zone(this.context, zone)
        ),
        misc: (r.zones.misc || []).map((zone) => new Zone(this.context, zone)),
        trick: (r.zones.trick || []).map(
          (zone) => new Zone(this.context, zone)
        ),
      };
    });
  }

  async records(args) {
    let rs = null;
    if (this.attrs.name) {
      rs = await this.context.tempus.recordListByMapName.load({
        mapName: this.attrs.name,
        ...args,
      });
    } else {
      rs = await this.context.tempus.recordListByMapId.load({
        mapId: this.attrs.id,
        ...args,
      });
    }
    const zone = new Zone(this.context, { ...rs.zone_info, map: this });
    if (args.class === "soldier") {
      return rs.results.soldier.map(
        (record) =>
          new Record(this.context, { ...record, zone, map: this, class: 3 })
      );
    }

    return rs.results.demoman.map(
      (record) =>
        new Record(this.context, { ...record, zone, map: this, class: 4 })
    );
  }

  async record(args) {
    let r = null;
    if (this.attrs.name) {
      r = await this.context.tempus.playerRecordByMapName.load({
        mapName: this.attrs.name,
        ...args,
      });
    } else {
      r = await this.context.tempus.playerRecordByMapId.load({
        mapId: this.attrs.id,
        ...args,
      });
    }
    if (!r.result) return null;

    let demoInfo = null;
    if (r.result.demo_id) {
      demoInfo = {
        id: r.result.demo_id,
        url: r.result.demo_url,
        server_info: {
          id: r.result.demo_server_id,
          name: r.result.demo_server_name,
        },
      };
    }

    return new Record(this.context, {
      ...r.result,
      zone_info: r.zone_info,
      player_info: {
        id: r.result.user_id,
        name: r.result.name,
        steamid: r.result.steamid,
      },
      map: this,
      demo_info: demoInfo,
    });
  }

  async wr(args) {
    let rs = null;
    if (this.attrs.name) {
      rs = await this.context.tempus.wrsByMapName.load(this.attrs.name);
    } else {
      rs = await this.context.tempus.wrsByMapId.load(this.attrs.id);
    }
    if (!rs[args.class]) return null;
    const splits = JSON.parse(JSON.stringify(rs[args.class].wr.splits));
    splits.push({
      type: "map",
      zoneindex: 1,
      duration: rs[args.class].wr.duration,
      compared_duration: rs[args.class].rank2 && rs[args.class].rank2.duration,
    });
    return new Record(this.context, {
      ...rs[args.class].wr,
      zone_info: {
        id: rs[args.class].wr.zone_id,
        map_id: this.attrs.id,
        map_name: this.attrs.name,
        type: "map",
        zoneindex: 1,
      },
      map: this,
      splits,
    });
  }
}

export default Map;
