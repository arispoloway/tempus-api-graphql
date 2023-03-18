import BaseModel from "./base_model";
import Record from "./record";
import Map from "./map";

class Player extends BaseModel {
  fetchRecord() {
    return this.context.tempus.playersById.load(this.attrs.id);
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
    return this.access("steamid", (r) => r.player_info.steamid);
  }

  firstSeen() {
    return this.access("first_seen", (r) => r.player_info.first_seen);
  }

  lastSeen() {
    return this.access("last_seen", (r) => r.player_info.last_seen);
  }

  ranks() {
    return this.access("ranks", (r) => {
      return {
        overall: { ...r.rank_info, totalRanked: r.rank_info.total_ranked },
        soldier: {
          ...r.class_rank_info[3],
          totalRanked: r.class_rank_info[3].total_ranked,
        },
        demoman: {
          ...r.class_rank_info[4],
          totalRanked: r.class_rank_info[4].total_ranked,
        },
      };
    });
  }

  countryRanks() {
    return this.access("country_ranks", (r) => {
      return {
        overall: {
          ...r.country_rank_info,
          totalRanked: r.country_rank_info.total_ranked,
        },
        soldier: {
          ...r.country_class_rank_info[3],
          totalRanked: r.country_class_rank_info[3].total_ranked,
        },
        demoman: {
          ...r.country_class_rank_info[4],
          totalRanked: r.country_class_rank_info[4].total_ranked,
        },
      };
    });
  }

  stats() {
    return this.access("stats", (r) => {
      return { pr: r.pr_stats, wr: r.wr_stats, top: r.top_stats };
    });
  }

  async record(args) {
    let r = null;
    const playerId = await this.id();
    if (args.mapName) {
      r = await this.context.tempus.playerRecordByMapName.load({
        playerId,
        ...args,
      });
    } else if (args.mapId) {
      r = await this.context.tempus.playerRecordByMapId.load({
        playerId,
        ...args,
      });
    } else {
      throw new Error('One of "mapId"/"mapName" must be provided.');
    }
    if (!r.result) return null;

    let demo_info = null;
    if (r.result.demo_id) {
      demo_info = {
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
      map: new Map(this.context, { id: r.zone_info.map_id }),
      demo_info: demo_info,
    });
  }
}

export default Player;
