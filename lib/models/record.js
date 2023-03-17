import BaseModel from "./base_model";
import Player from "./player";
import Map from "./map";
import Demo from "./demo";
import Zone from "./zone";
import Server from "./server";
import Split from "./split";

class Record extends BaseModel {
  fetchRecord() {
    return this.context.tempus.recordsById.load(this.attrs.id);
  }

  id() {
    return this.attrs.id;
  }

  player() {
    if (this.attrs.player_info)
      return new Player(this.context, this.attrs.player_info);

    return this.access(
      "player",
      (r) => new Player(this.context, r.player_info)
    );
  }

  duration() {
    return this.access("duration", (r) => r.record_info.duration);
  }

  date() {
    return this.access("date", (r) => r.record_info.date);
  }

  rank() {
    return this.access("rank", (r) => r.record_info.rank);
  }

  tiers() {
    return this.access("tiers", (r) => r.tier_info);
  }

  map() {
    if (this.attrs.map_info) return new Map(this.context, this.attrs.map_info);

    return this.access("map", (r) => new Map(this.context, r.map_info));
  }

  class() {
    if (this.attrs.class) return this.attrs.class === 3 ? "soldier" : "demoman";

    return this.access(null, (r) =>
      r.record_info.class === 3 ? "soldier" : "demoman"
    );
  }

  demo() {
    if (this.attrs.demo_info)
      return new Demo(this.context, this.attrs.demo_info);

    return this.access(
      "demo",
      (r) => r.demo_info && new Demo(this.context, r.demo_info)
    );
  }

  zone() {
    if (this.attrs.zone_info)
      return new Zone(this.context, this.attrs.zone_info);

    return this.access(
      "zone",
      (r) => r.zone_info && new Zone(this.context, r.zone_info)
    );
  }

  demoStartTick() {
    return this.access("demo_start_tick", (r) => r.record_info.demo_start_tick);
  }

  demoEndTick() {
    return this.access("demo_end_tick", (r) => r.record_info.demo_end_tick);
  }

  server() {
    return this.access(
      "server",
      (r) => new Server(this.context, { id: r.record_info.server_id })
    );
  }

  async splits() {
    if (this.rank > 1) return [];

    let { splits } = this.attrs;

    if (!splits) {
      let rs = null;
      if (this.attrs.map_info.name || this.attrs.map.attrs.name) {
        rs = await this.context.tempus.wrsByMapName.load(
          this.attrs.map_info.name || this.attrs.map.attrs.name
        );
      } else {
        rs = await this.context.tempus.wrsByMapId.load(
          this.attrs.map_info.id || this.attrs.map.attrs.id
        );
      }
      const cls = [3, "soldier"].includes(this.attrs.class)
        ? "soldier"
        : "demoman";
      if (!rs[cls]) return [];
      splits = JSON.parse(JSON.stringify(rs[cls].wr.splits));
      splits.push({
        type: "map",
        zoneindex: 1,
        duration: rs[cls].wr.duration,
        compared_duration: rs[cls].rank2 && rs[cls].rank2.duration,
      });
    }

    return splits.map((split) => new Split(this.context, split));
  }
}

export default Record;
