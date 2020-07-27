import BaseModel from './base_model.js';
import Player from './player.js';
import Map from './map.js';
import Demo from './demo.js';
import Server from './server.js';
import { recordsById } from '../tempus.js';

class Record extends BaseModel {
    fetchRecord() {
        return recordsById.load(this.attrs.id);
    }

    player() {
        if (this.attrs.player_info) return new Player(this.attrs.player_info);

        return this.access('player', (r) => new Player(r.player_info));
    }

    duration() {
        return this.access('duration', (r) => r.record_info.duration);
    }

    date() {
        return this.access('date', (r) => r.record_info.date);
    }

    rank() {
        return this.access('rank', (r) => r.record_info.rank);
    }

    tiers() {
        return this.access('tiers', (r) => r.tier_info);
    }

    map() {
        if (this.attrs.map_info) return new Map(this.attrs.map_info);

        return this.access('map', (r) => new Map(r.map_info));
    }

    demo() {
        return this.access('demo', (r) => r.demo_info && new Demo(r.demo_info));
    }

    demoStartTick() {
        return this.access('demo_start_tick', (r) => r.record_info.demo_start_tick);
    }

    demoEndTick() {
        return this.access('demo_end_tick', (r) => r.record_info.demo_end_tick);
    }

    server() {
        return this.access('server', (r) => new Server({id: r.record_info.server_id}));
    }
}

export default Record;
