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
}

export default Player;
